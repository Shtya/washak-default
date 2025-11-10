import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ChevronDown, ChevronLeft, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchIcon from '../atoms/SearchIcon';
import { useAppContext } from '../../contexts/AppContext';
import MenuItem from '../atoms/MenuItem';
import { getFullPath } from '../../helper/getFullPath';
import useMenuNavigation from '../../hooks/useMenuNavigation';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import Logo from '../atoms/Logo.jsx';
import { useCartContext } from '../../contexts/cartContext.js';

export default function Navbar() {
  const { menu, loadingMenu, menuSetting, storeOptions } = useAppContext();

  const menuItems = menu?.header?.data || [];

  const {
    currentMenu,
    isMain,
    mainPageSlug,
    settings,
    goToSubmenu,
    goBack,
    resetMenu,
    menuOpen,
    setMenuOpen,
    history,
    count,
    imageSources,
    storeDomainLoading
  } = useMenuNavigation(menuItems, menuSetting);


  const {
    value: shopName = '',
    status: shopNameStatus = 0
  } = storeOptions?.shop_name || {};

  const { header_text = '', header_enable_switch = '1', site_logo_enable = '1', search_enable = '0', cart_enable = '1', cart_icon = '', navbar_enable = '1', bar_icon = 'fa-bars' } = settings;
  const onlyDesktopLinks = site_logo_enable !== '1' && search_enable !== '1' && cart_enable !== '1' && menuItems.length > 0;


  if (!menu?.header && !loadingMenu) {
    return <FallbackHeader />
  }

  return (
    <div className={`main-header ${header_enable_switch !== '1' && "is-scrolled"} sticky top-0 z-50  ${menuOpen ? "menu-open" : ""}`}
      style={{ backgroundColor: 'var(--bk_color, white)' }}>
      {header_enable_switch === '1' && header_text && (
        <header
          className="header-bar text-white w-full flex items-center justify-center gap-4 text-base max-md:text-xs duration-500 transition-all"
          style={{ background: 'var(--sticky_header_bg, var(--main))' }}
        >
          <img
            src="/icons/car.png"
            alt=""
            width={28}
            height={28}
            className="max-sm:hidden object-contain"
          />
          <p
            className="md:leading-[55px] max-md:py-[10px] text-center"
            dangerouslySetInnerHTML={{ __html: header_text }}
          />
        </header>
      )}

      {/* Main nav */}
      {navbar_enable === '1' &&
        <div
          className="navbar bg-white"
          style={{ boxShadow: '0px 4px 4px 0px #CFCFCF40' }}
        >
          <nav className={`container !h-[80px] mx-auto flex items-center py-4 !px-4 lg:px-0 gap-3 ${onlyDesktopLinks ? 'lg:justify-center' : 'lg:justify-between'
            }`}>
            {site_logo_enable === '1' && (
              <Link to="/" >
                <Logo
                  sources={imageSources}
                  storeDomainLoading={storeDomainLoading}
                  alt={shopNameStatus === 1 ? shopName : "Logo"}
                  className="logo object-contain duration-500 max-h-20"
                />
              </Link>
            )}

            {/* Desktop links - hidden on mobile */}
            <ul className="nav-menu hidden lg:flex items-center text-base duration-500">
              {loadingMenu
                ? Array.from({ length: 4 }).map((_, i) => (
                  <li key={i} className="w-16 h-5 bg-gray-200 rounded animate-pulse mx-2" />
                ))
                : menuItems.map((item, index) => (
                  <MenuItem key={index} item={item} />
                ))}
            </ul>

            {/* Icons - show bar icon only on mobile */}
            <div className={`flex items-center flex-1 lg:flex-none gap-[15px] ${site_logo_enable ? "justify-end" : "justify-between"} lg:justify-normal `}>
              <div className='flex items-center gap-[15px]'>

                {cart_enable === '1' && (
                  <Link
                    id="cart-icon"
                    to="/cart"
                    className="relative cursor-pointer p-1 w-8 h-8 duration-500"
                  >
                    <span
                      id="cart-count"
                      className="absolute top-[-5px] right-[-5px] w-4 h-4 rounded-full  text-[10px] flex items-center justify-center"
                      style={{ background: 'var(--cart_num_bg_color, var(--main))', color: "var(--cart_num_color, white)" }}
                    >
                      {count}
                    </span>
                    {cart_icon ? (
                      <i className={`${cart_icon} fa-solid text-2xl `}
                        style={{ color: 'var(--icon_border, black)' }}
                      />
                    ) : (
                      <img src="/icons/cart.png" alt="Cart" width={30} height={30} />
                    )}
                  </Link>
                )}
                {search_enable === '1' && <SearchIcon />}
              </div>

              <MobileMenuToggle bar_icon={bar_icon} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

            </div>
          </nav>

          <MobileMenu
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            currentMenu={currentMenu}
            history={history}
            isMain={isMain}
            mainPageSlug={mainPageSlug}
            goToSubmenu={goToSubmenu}
            goBack={goBack}
            loading={loadingMenu}
            resetMenu={resetMenu}
          />

        </div>}
    </div>
  )
}

function MobileMenuToggle({ bar_icon, menuOpen, setMenuOpen }) {
  return (
    <button
      onClick={() => setMenuOpen(prev => !prev)}
      className="lg:hidden focus:outline-none"
      style={{ color: "var(--icon_border, black)" }}
      aria-label="Toggle menu"
    >
      {bar_icon ? (
        bar_icon === "fa-toggle-off" || bar_icon === "fa-toggle-on" ? (
          <i
            className={`${menuOpen ? "fa-toggle-on" : "fa-toggle-off"} fa-solid text-[26px] cursor-pointer`}
          />
        ) : (
          <i
            className={`${bar_icon} fa-solid text-[26px] cursor-pointer`}
          />
        )
      ) : (
        <Menu className="w-6 h-6 cursor-pointer" />
      )}

    </button>
  );
}

function MenuList({ items = [], goToSubmenu, setMenuOpen, fullPathFactory, loading = false, resetMenu }) {
  const handleCloseMenu = () => {
    setMenuOpen(false);
    setTimeout(() => {
      resetMenu();
    }, 100);
  };


  if (loading) {
    // Skeleton placeholders during loading
    return (
      <ul className="flex flex-col px-4 py-6 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <li
            key={i}
            className="w-full h-10 bg-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex flex-col px-4 py-6 space-y-3">
      {items.map((item, index) => {
        const fullPath = fullPathFactory(item, index);

        return (
          <li key={index} className="group">
            <div className="mobile-link flex justify-between items-center py-3 px-4 rounded-lg cursor-pointer bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 ease-in-out transform hover:scale-[1.02]  border border-transparent hover:border-blue-100">
              {item?.page_type === 'custom_page' ? (
                <a
                  href={fullPath || '#'}
                  target={item.target || '_self'}
                  rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                  onClick={() => setMenuOpen(false)}
                  className="text  w-full  font-semibold transition-colors duration-200 "
                  style={{ color: "var(--text_color, var(--black-2))" }}
                >
                  {item.text || 'Menu Item'}
                </a>
              ) : (
                <Link
                  to={fullPath || '#'}
                  target={item.target || '_self'}
                  onClick={handleCloseMenu}
                  className="text w-full  font-semibold transition-colors duration-200 "
                  style={{ color: "var(--text_color, var(--black-2))" }}
                >
                  {item.text || 'Menu Item'}
                </Link>
              )}

              {item.children?.length > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    goToSubmenu(index);
                  }}
                  className="p-2  hover:!text-[var(--main)] transition-all duration-200 transform hover:scale-110 hover:rotate-90 group-hover:bg-blue-100 rounded-full"
                  aria-label={`Open submenu for ${item.text}`}
                >
                  <ChevronDown className="icon w-4 h-4   transition-all duration-200 group-hover:animate-bounce"
                    style={{ color: "var(--text_color, var(--black-2))" }} />
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function MobileMenu({
  menuOpen,
  setMenuOpen,
  currentMenu,
  history,
  isMain,
  mainPageSlug,
  goToSubmenu,
  goBack,
  loading = false,
  resetMenu
}) {
  const fullPathFactory = (item) => getFullPath(isMain ? item.page_slug : mainPageSlug, item.href);

  // Create a ref for the mobile menu
  const mobileMenuRef = useRef(null);

  // Use the outside click hook to close menu when clicking outside
  useOutsideClick(mobileMenuRef, () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  });

  return (
    <div
      ref={mobileMenuRef}
      className={`mobile-menu lg:hidden fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-2xl rounded-l-xl z-50 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="p-4 flex justify-end border-b">
        <X className="cursor-pointer hover:!text-red-500 transition duration-300" onClick={() => setMenuOpen(false)}
          style={{ color: 'var(--icon_border, black)' }} />
      </div>

      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <p className="font-bold ml-2"
        >{currentMenu.title}</p>

        {history.length > 0 && (
          <button onClick={goBack} className="flex items-center text-base hover:text-[var(--main)]" aria-label="Back">
            Back
            <ChevronLeft className="w-4 h-4 mr-1" />
          </button>
        )}
      </div>

      <MenuList
        items={currentMenu.items}
        goToSubmenu={goToSubmenu}
        setMenuOpen={setMenuOpen}
        fullPathFactory={fullPathFactory}
        loading={loading}
        resetMenu={resetMenu}
      />
    </div>
  );
}

// Fallback Header Component
function FallbackHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const { count } = useCartContext()

  // Use the outside click hook to close menu when clicking outside
  useOutsideClick(mobileMenuRef, () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  });


  return (
    <div className={`main-header sticky top-0 z-50 ${menuOpen ? "menu-open" : ""}`}
      style={{ backgroundColor: 'var(--bk_color, white)' }}>
      {/* Header Bar */}
      <header
        className="header-bar text-white w-full flex items-center justify-center gap-4 text-base max-md:text-xs duration-500 transition-all"
        style={{ background: 'var(--main)' }}
      >
        <img
          src="/icons/car.png"
          alt=""
          width={28}
          height={28}
          className="max-sm:hidden object-contain lg:mr-20"
        />
        <p className="md:leading-[55px] max-md:py-[10px] text-center">
          أفضل المنتجات بأفضل الأسعار
        </p>
      </header>

      {/* Main Navigation */}
      <div
        className="bg-white"
        style={{ boxShadow: '0px 4px 4px 0px #CFCFCF40' }}
      >
        <nav className="container !h-[80px] mx-auto flex items-center lg:justify-between py-4 !px-4 lg:px-0">
          {/* Logo */}
          <Link to="/">
            <img
              src={process.env.REACT_APP_DEFAULT_STORE_LOGO || '/logo.png'}
              alt="Logo"
              width={126}
              height={50}
              className="logo object-contain duration-500"
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="nav-menu hidden lg:flex items-center text-base duration-500 gap-6">
            <li className="relative">
              <Link to="/" className="navlink flex items-center whitespace-nowrap text-[var(--black-2)] hover:text-[var(--main)] transition-all duration-200 ease-in-out">
                <span className="px-2 py-1 font-medium transition-all duration-200">
                  الرئيسية
                </span>
              </Link>
            </li>
            <li className="relative">
              <Link to="/products" className="navlink flex items-center whitespace-nowrap text-[var(--black-2)] hover:text-[var(--main)] transition-all duration-200 ease-in-out">
                <span className="px-2 py-1 font-medium transition-all duration-200">
                  المنتجات
                </span>
              </Link>
            </li>
            <li className="relative">
              <Link to="/contact-us" className="navlink flex items-center whitespace-nowrap text-[var(--black-2)] hover:text-[var(--main)] transition-all duration-200 ease-in-out">
                <span className="px-2 py-1 font-medium transition-all duration-200">
                  اتصل بنا
                </span>
              </Link>
            </li>
          </ul>

          {/* Icons */}
          <div className="flex items-center flex-1 lg:flex-none gap-[15px] justify-end lg:justify-normal">
            <div className='flex items-center gap-[15px]'>
              <Link
                id="cart-icon"
                to="/cart"
                className="relative cursor-pointer p-1 w-8 h-8 duration-500"
              >
                <span
                  id="cart-count"
                  className="absolute top-[-5px] right-[-5px] w-4 h-4 rounded-full text-white text-[10px] flex items-center justify-center"
                  style={{ background: 'var(--cart_num_bg_color, var(--main))', color: "var(--cart_num_color, white)" }}
                >
                  {count}
                </span>
                <img src="/icons/cart.png" alt="Cart" width={30} height={30} />
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              className="lg:hidden focus:outline-none"
              style={{ color: "var(--icon_border, black)" }}
              aria-label="Toggle menu"
            >
              <i className={`fa-bars fa-solid text-[26px] cursor-pointer`} />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`mobile-menu lg:hidden fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-2xl rounded-l-xl z-50 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="p-4 flex justify-end border-b">
            <X className="cursor-pointer text-gray-600 hover:text-red-500 transition duration-300" onClick={() => setMenuOpen(false)}
              style={{ color: "var(--icon_border, black)" }} />
          </div>

          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <p className="font-bold ml-2">القائمة الرئيسية</p>
          </div>

          <ul className="flex flex-col px-4 py-6 space-y-3">
            <li className="group">
              <div className="flex justify-between items-center py-3 px-4 rounded-lg cursor-pointer bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 ease-in-out transform hover:scale-[1.02] border border-transparent hover:border-blue-100">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="header-fallback-link w-full text-[var(--black-2)] font-semibold transition-colors duration-200 hover:text-[var(--main)]"
                >
                  الرئيسية
                </Link>
              </div>
            </li>
            <li className="group">
              <div className="flex justify-between items-center py-3 px-4 rounded-lg cursor-pointer bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 ease-in-out transform hover:scale-[1.02] border border-transparent hover:border-blue-100">
                <Link
                  to="/products"
                  onClick={() => setMenuOpen(false)}
                  className="header-fallback-link w-full text-[var(--black-2)] font-semibold transition-colors duration-200 hover:text-[var(--main)]"
                >
                  المنتجات
                </Link>
              </div>
            </li>
            <li className="group">
              <div className="flex justify-between items-center py-3 px-4 rounded-lg cursor-pointer bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 ease-in-out transform hover:scale-[1.02] border border-transparent hover:border-blue-100">
                <Link
                  to="/contact-us"
                  onClick={() => setMenuOpen(false)}
                  className="header-fallback-link w-full text-[var(--black-2)] font-semibold transition-colors duration-200 hover:text-[var(--main)]"
                >
                  اتصل بنا
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
