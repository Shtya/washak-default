import { Helmet } from 'react-helmet';
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAppContext } from "../../contexts/AppContext";
import Meta from "../atoms/Meta";
import { useStoreLogos } from '../../hooks/useStoreLogos';

export function AppLayout() {
    const { storeOptions, } = useAppContext();
    const { faviconLogo, defaultFaviconLogo, storeDomainLoading } = useStoreLogos()
    const seoData = storeOptions?.seo?.value || {};

    // pull out your addon CSS/JS
    const addon = storeOptions?.addon_content;
    const { additional_css, additional_js } = addon?.value || {};
    const shouldInject = addon?.status == 1;

    const appName = storeOptions?.shop_name?.value;

    // --- DECLARE IT HERE ---
    const {
        value: shopDesc = '',
        status: shopDescStatus = 0
    } = storeOptions?.shop_description || {};

    return (
        <div className='min-h-[970px] flex flex-col'>
            {storeOptions?.seo?.status == 1 && (
                <Meta
                    title={seoData.title || appName}
                    twitterTitle={seoData.twitterTitle}
                    description={seoData.description}
                    canonical={seoData.canonical}
                    keywords={seoData.tags}
                    faviconIco={faviconLogo}
                    storeDomainLoading={storeDomainLoading}
                    defaultFaviconIco={defaultFaviconLogo}
                    appName={appName}
                />
            )}

            {shopDescStatus == 1 && (
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": appName,
                        "description": shopDesc,
                        "url": window.location.origin
                    })}
                </script>
            )}

            {/* this Helmet block injects your runtime CSS/JS */}
            {shouldInject && (
                <Helmet>
                    {additional_css && (
                        <style type="text/css">{additional_css}</style>
                    )}
                    {additional_js && (
                        <script type="text/javascript">{additional_js}</script>
                    )}
                </Helmet>
            )}

            <Navbar />
            <main className="main-layout flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
