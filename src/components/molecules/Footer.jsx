import { ChevronRight, Mail, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import useJsonParser from '../../hooks/useJsonParser';
import { useAppContext } from '../../contexts/AppContext';
import { getFullPath } from '../../helper/getFullPath';
import { useIsActiveLink } from '../../hooks/useIsActiveLink';
import { useEffect, useState } from 'react';
import { useStoreLogos } from '../../hooks/useStoreLogos';

import Logo from '../atoms/Logo';
import { useMenu } from '../../hooks/globalSettings/useMenu';

export default function Footer() {
  const { menu, loadingMenu, menuSetting, loadingSetting, storeOptions } = useAppContext();
  const settings = useJsonParser(
    menuSetting?.footer?.[0]?.settings,
    'Failed to parse footer settings:'
  );

  const {
    footer_enable_switch = '1',
    footer_logo_switch = '1',
    text_under_logo_status = 'yes',
    footer_text_under_logo = '',
    footer_phone_number = '',
    footer_email = '',
    footer_copyright = '',
    footer_copyrights_switch = '1',
    footer_alignment = 'horizontal',
    footer_social_icons = []
  } = settings;
  const isVertical = footer_alignment !== 'horizontal';
  const {
    value: shopName = '',
    status: shopNameStatus = 0
  } = storeOptions?.shop_name || {};

  const {
    value: shopDesc = '',
    status: shopDescStatus = 0
  } = storeOptions?.shop_description || {};


  const [lastIsVertical, setLastIsVertical] = useState(() => {
    if (typeof window === "undefined") return !!isVertical;
    const raw = localStorage.getItem("footer_isVertical");
    return raw !== null ? JSON.parse(raw) : !!isVertical;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("footer_isVertical", JSON.stringify(!!isVertical));
    setLastIsVertical(!!isVertical);
  }, [isVertical]);

  // filter out empty sections
  const positions = ["right", "center", "left"];

  const activeSections = positions
    .map((pos) => menu?.footer?.[pos])
    .filter((section) => section && section.data.length > 0);
  const isLogoSideEnabled = footer_logo_switch === '1' || (text_under_logo_status === 'yes' && footer_text_under_logo !== '');


  const footerSectionsNumber = isLogoSideEnabled ? activeSections.length + 2 : activeSections.length + 1;
  const gridStyle = (() => {
    switch (isLogoSideEnabled ? activeSections.length + 2 : activeSections.length + 1) {
      case 4:
        return { grid: "grid-cols-2 lg:grid-cols-4", image: "col-span-2 xl:col-span-1" };
      case 3:
        return { grid: "grid-cols-2 lg:grid-cols-3", image: "col-span-2 lg:col-span-1" }
      case 2:
        return { grid: "grid-cols-2 md:grid-cols-2", image: "col-span-2 md:col-span-1" }
      case 1:
        return { grid: "grid-cols-1", image: "" }
      default:
        return { grid: "grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 ", image: "col-span-2 lg:col-span-4 2xl:col-span-1" };
    }
  })();

  // Show fallback footer if no settings or footer is disabled
  if (!menuSetting?.footer && !loadingSetting) {
    return <FallbackFooter />;
  }


  if (footer_enable_switch !== '1') return null;

  const alignmentClasses =
    footer_alignment === 'vertical'
      ? 'grid grid-cols-2 items-start'
      : `grid  ${gridStyle.grid} items-start`;


  return (
    <footer className=" overflow-hidden "
      style={{ background: 'var(--footer_bg_color, var(--main-secondary))', color: 'var(--footer_font_color, white)' }}
    >
      <div className="container  !pt-[36px]  md:!pt-[60px] !pb-2 !px-6 lg:!px-8">
        {loadingSetting || loadingMenu ? <FooterSkeleton isVertical={lastIsVertical} /> :
          <>

            <div className={`gap-[20px] md:gap-[34px]  ${alignmentClasses}`}>
              <FooterBrand
                className={footer_alignment !== 'vertical' && gridStyle.image}
                footer_logo_switch={footer_logo_switch}
                footer_text_under_logo={footer_text_under_logo}
                text_under_logo_status={text_under_logo_status}
                footer_alignment={footer_alignment}
                isLogoSideEnabled={isLogoSideEnabled}
                shopName={shopNameStatus == 1 ? shopName : ""}
                shopDesc={shopDescStatus === 1 ? shopDesc : ''}
              />

              <FooterLinks activeSections={activeSections} isVertical={isVertical} />

              <div className={`${footerSectionsNumber == 4 && 'max-lg:col-span-2'} `}>

                <FooterContact
                  footer_alignment={footer_alignment}
                  footer_phone_number={footer_phone_number}
                  footer_email={footer_email}
                  footer_social_icons={footer_social_icons}
                />
              </div>
            </div>

            {/* Copyright */}
            {
              footer_copyrights_switch === '1' &&
              footer_copyright && (
                <div className="border-t border-white/10 mt-[14px] sm:mt-[34px] flex items-center justify-center min-h-[69px] text-center">
                  <div
                    className="text-[10px] md:text-xs lg:text-sm "
                    style={{ color: 'var(--footer_font_color, white)' }}
                    dangerouslySetInnerHTML={{ __html: footer_copyright }}
                  />
                </div>
              )}
          </>}
      </div>
    </footer>
  );
}

function FooterBrand({
  className,
  footer_logo_switch,
  footer_text_under_logo,
  text_under_logo_status,
  footer_alignment,
  isLogoSideEnabled,
  shopName,
  shopDesc
}) {
  const { footerLogo, defaultStoreLogo, storeDomainLoading } = useStoreLogos();


  return (
    <div
      className={`flex ${className} flex-col  gap-3 sm:gap-6 ${footer_alignment === 'vertical' ? 'col-span-2 items-start' : ' items-start'} ${!isLogoSideEnabled && "hidden"} `}
    >
      {footer_logo_switch === '1' && (
        <Link to="/" className="group">
          <Logo
            sources={[footerLogo, defaultStoreLogo, '/logo-white.png']}
            storeDomainLoading={storeDomainLoading}
            alt={shopName || "Logo"}
            className="
        max-w-[80px] 
        sm:max-w-[100px] 
        lg:max-w-[120px] 
        max-h-[80px] sm:max-h-[100px] lg:max-h-[120px]
        h-auto object-contain 
        opacity-90 hover:opacity-100 transition-opacity duration-200
      "
          />
        </Link>
      )}

      {text_under_logo_status === 'yes' && footer_text_under_logo && (
        <div
          className="font-light leading-relaxed 2xl:max-w-md text-xs sm:text-sm md:text-base"
          style={{ color: 'var(--footer_font_color, white)' }}
          dangerouslySetInnerHTML={{ __html: footer_text_under_logo }}
        />
      )}


      {/* {shopDesc && (
          <p className="font-light leading-relaxed max-w-md text-xs sm:text-sm md:text-base mt-2"
            style={{ color: 'var(--footer_font_color, white)' }}
          >
            {shopDesc}
          </p>
        )} */}

    </div>
  );
}

function FooterLinks({ activeSections, isVertical }) {


  if (!activeSections.length) return null;

  return (
    <>
      {/* <div
        className={`footer-grid grid gap-[14px] sm:gap-[34px] grid-cols-1 text-center lg:text-right  ${isVertical
          ? '!grid-cols-1 !place-items-center text-center'
          : ''
          }`}
        style={{ "--cols": String(activeSections.length) }}
      > */}
      {activeSections.map((section, idx) => (
        <div
          key={section.position || idx}
          className={`flex flex-col gap-4 md:gap-6  ${isVertical ? '' : ''}`}
        >
          <h3
            className="text-sm md:text-base sm:text-lg font-semibold  tracking-wide"
            style={{ color: 'var(--footer_heads_color, white)' }}
          >
            <span className='underline'
              style={{ textDecorationColor: 'var(--footer_heads_underline_color, transparent)', textUnderlineOffset: '6px' }} >{section.name || "قسم"}</span>
          </h3>
          <FooterLinksList
            links={section.data}
            position={section.position}
            isVertical={isVertical}
          />
        </div>
      ))}
      {/* </div> */}
    </>
  )
}

const FooterLinksList = ({ links, position, level = 0, isVertical, parentSlug = "" }) => {

  return (
    <ul className={`flex  gap-3 md:gap-4 ${isVertical ? "flex-col " : "flex-col lg:justify-start"}`} style={{ paddingRight: `${level * 0.3}rem` }} >
      {links.map((link, index) => {

        return (
          <FooteItem
            key={`${position}-${level}-${index}`}
            link={link}
            index={index}
            isVertical={isVertical}
            level={level}
            position={position}
            parentSlug={level > 0 ? parentSlug : link.page_slug}
          />
        );
      })}
    </ul >
  );
};

const FooteItem = ({ link, position, level, isVertical, index, parentSlug }) => {
  const fullHref = getFullPath(parentSlug, link.href);
  const isActive = useIsActiveLink(fullHref);

  return <li className={`flex gap-2 sm:gap-3 ${isVertical ? 'flex-row lg:flex-col' : 'flex-row lg:flex-col'}`}>
    <Link
      to={
        fullHref?.startsWith("/")
          ? fullHref
          : `/${fullHref || "#"} `
      }
      className={`footer-item-link ${isActive ? "active" : ""} relative flex items-center gap-1 sm:gap-2 transition-all duration-200 w-fit text-xs md:text-sm  `}
    >
      {level > 0 && (
        <ChevronRight
          size={12}
          className="footer-item-icon transition-colors sm:w-3.5 sm:h-3.5 w-3 h-3"
        />
      )}
      <span
        className={`relative transition-colors duration-100 `}
      >
        {link.text || `Link ${index + 1} `}
        <span className={`block footer-item-line absolute-bottom-1 right-0 h-0.5 transition-all duration-200 w-0`} />
      </span>
    </Link>

    {Array.isArray(link.children) &&
      link.children.length > 0 &&

      <FooterLinksList links={link.children} position={position} level={level + 1} isVertical={isVertical} parentSlug={parentSlug} />}
  </li>
}

function FooterContact({
  footer_alignment,
  footer_phone_number,
  footer_email,
  footer_social_icons
}) {
  return (
    <div
      className={`flex flex-col gap-3 sm:gap-5 ${footer_alignment === 'vertical' ? 'items-start text-left' : 'items-start text-left'} `}

    >
      {(footer_phone_number || footer_email || footer_social_icons?.length > 0) && <h3 className="text-base sm:text-lg font-semibold tracking-wide w-full text-start"
        style={{ color: 'var(--footer_heads_color,  white)' }}
      >
        <span className='underline'
          style={{ textDecorationColor: 'var(--footer_heads_underline_color, transparent)', textUnderlineOffset: '6px' }} >إتصل بنا</span>


      </h3>
      }

      <div className={`flex flex-col gap-2 sm:gap-3`}>
        {footer_phone_number && (
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 rounded-lg bg-white/10 flex items-center justify-center">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4 "
                style={{ color: 'var(--footer_font_color, white)' }}
              />
            </div>
            <a
              href={`tel:${footer_phone_number} `}
              className="footer-text-hover transition-colors text-xs sm:text-sm"
              style={{ color: 'var(--footer_font_color, white)' }}
            >
              {footer_phone_number}
            </a>
          </div>
        )}

        {footer_email && (
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 rounded-lg bg-white/10 flex items-center justify-center">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 "
                style={{ color: 'var(--footer_font_color, white)' }} />
            </div>
            <a
              href={`mailto:${footer_email} `}
              className=" footer-text-hover text-right transition-colors text-xs sm:text-sm  max-lg:break-all"
              style={{ color: 'var(--footer_font_color, white)' }}
            >
              {footer_email}
            </a>
          </div>
        )}
      </div>

      {footer_social_icons?.length > 0 && (
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-2">
          {footer_social_icons.map((icon, index) => (
            <a
              key={index}
              href={icon.iconURL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-lg"
              aria-label={`Social media link ${index + 1}`}
            >
              <i
                className={`${icon.icon} text-xs sm:text-sm md:text-base lg:text-lg`}
              />
            </a>

          ))}
        </div>
      )}
    </div>
  );
}

export function FooterSkeleton({ isVertical }) {
  return (
    <div
      className={`flex flex-col justify-center items-center gap-9 ${isVertical ? 'text-center' : 'lg:grid lg:grid-cols-4 grid-cols-1 lg:items-start'
        }`}
    >
      {/* Logo + Text Skeleton */}
      <div
        className={`flex flex-col gap-4 sm:gap-6 ${isVertical ? 'items-center text-center' : 'items-center lg:items-start'
          }`}
      >
        <div className="w-32 sm:w-40 h-10 bg-white/20 rounded animate-pulse" />
        <div className="h-4 w-64 bg-white/10 rounded animate-pulse" />
      </div>

      {/* Links Skeleton */}
      <div className={`${isVertical ? '' : 'lg:col-span-2'}`}>
        <div
          className={`grid gap-8 grid-cols-1 text-center lg:text-right ${isVertical ? '!grid-cols-1 !place-items-center text-center' : 'lg:grid-cols-3'
            }`}
        >
          {Array.from({ length: isVertical ? 1 : 3 }).map((_, i) => (
            <div
              key={i}
              className={`flex flex-col gap-4 ${isVertical ? 'items-center text-center' : 'lg:items-start'
                }`}
            >
              <div className="h-4 w-32 bg-white/20 rounded animate-pulse" />
              <ul className="flex flex-col gap-2">
                {Array.from({ length: 4 }).map((_, j) => (
                  <li key={j} className="h-3 w-24 bg-white/10 rounded animate-pulse" />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Skeleton */}
      <div
        className={`flex flex-col gap-4 sm:gap-6 ${isVertical ? 'items-center text-center' : 'items-center text-center lg:items-start lg:text-left'
          }`}
      >
        <div className="h-4 w-28 bg-white/20 rounded animate-pulse" />
        <div className="flex flex-col gap-2 sm:gap-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/10 rounded-lg animate-pulse" />
              <div className="h-3 w-32 bg-white/10 rounded animate-pulse" />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}


// Fallback Footer Component
function FallbackFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--main)] text-white">
      <div className="container !pt-[36px]  md:!pt-[60px] !pb-2">
        <div className="flex flex-col items-center gap-[14px] sm:gap-[34px] text-center">

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-7 text-xs sm:text-sm" style={{ color: 'var(--footer_font_color, white)' }}>
            <Link to="/" className=" transition-colors duration-200">
              الرئيسية
            </Link>
            <Link to="/products" className=" transition-colors duration-200">
              المنتجات
            </Link>
            <Link to="/contact-us" className=" transition-colors duration-200">
              اتصل بنا
            </Link>
          </div>
          {/* Description */}
          <p style={{ color: 'var(--footer_font_color, white)' }} className="flex items-center justify-center font-light leading-relaxed text-[10px] sm:text-sm md:text-base px-4 min-h-[58px] sm:min-h-[69px]">
            جميع الحقوق محفوظة لدى موقعنا  © 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
