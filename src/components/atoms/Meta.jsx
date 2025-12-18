import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { getMimeType } from '../../helper/getMimeType';

// do not forgot store description
export default function Meta({
  title = "Washak | تسوق أفضل المنتجات المنزلية بسهولة",
  twitterTitle = '',
  description = "اكتشف أفضل المنتجات المنزلية بأسعار مذهلة وخدمة توصيل سريعة مع واشك. تسوق الآن وتمتع بتجربة فريدة.",
  canonical = '',
  keywords = "منتجات منزلية, تسوق, واشك, أدوات المطبخ",
  faviconIco,
  defaultFaviconIco,
  storeDomainLoading,
  appName = ""
}) {

  const candidates = [faviconIco, defaultFaviconIco, '/favicon.png',]
  const [activeFavicon, setActiveFavicon] = useState(candidates[0]);

  useEffect(() => {
    let cancelled = false;
    if (storeDomainLoading) return;

    function tryLoad(index) {
      if (cancelled || index >= candidates.length) return;
      const img = new Image();
      img.onload = () => !cancelled && activeFavicon != candidates[index] && setActiveFavicon(candidates[index]);
      img.onerror = () => tryLoad(index + 1);
      img.src = candidates[index];
    }

    tryLoad(0);
    return () => { cancelled = true; };
  }, [faviconIco, defaultFaviconIco, storeDomainLoading]);

  return (
    <Helmet>
      <title>{title}</title>
      {appName && <meta name="application-name" content={appName} />}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}

      <link rel="icon" href={activeFavicon} type={getMimeType(activeFavicon)} />

      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={activeFavicon} />
      <meta property="og:type" content="website" />
      {canonical && <meta property="og:url" content={canonical} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterTitle || title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={activeFavicon} />
    </Helmet>
  );
}