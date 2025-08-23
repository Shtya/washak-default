import { Helmet } from 'react-helmet';

export default function Meta({
  title = "Washak | تسوق أفضل المنتجات المنزلية بسهولة",
  twitterTitle = '',
  description = "اكتشف أفضل المنتجات المنزلية بأسعار مذهلة وخدمة توصيل سريعة مع واشك. تسوق الآن وتمتع بتجربة فريدة.",
  canonical = '',
  keywords = "منتجات منزلية, تسوق, واشك, أدوات المطبخ",
  appName = ""
}) {
  return (
    <Helmet>
      <title>{title}</title>
      {appName && <meta name="application-name" content={appName} />}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      <link rel="icon" href="/favicon.png" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content="/favicon.png" />
      <meta property="og:type" content="website" />
      {canonical && <meta property="og:url" content={canonical} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterTitle || title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content="/favicon.png" />
    </Helmet>
  );
}
