import { Helmet } from 'react-helmet';
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAppContext } from "../../contexts/AppContext";
import Meta from "../atoms/Meta";

export function AppLayout() {
    const { storeOptions } = useAppContext();
    const seoData = storeOptions?.seo?.value || {};

    // pull out your addon CSS/JS
    const addon = storeOptions?.addon_content;
    const { additional_css, additional_js } = addon?.value || {};
    const shouldInject = addon?.status === 1;

    const appName = storeOptions?.shop_name?.value;

    return (
        <div className='min-h-[970px] flex flex-col'>
            {storeOptions?.seo?.status === 1 && (
                <Meta
                    title={seoData.title || appName}
                    twitterTitle={seoData.twitterTitle}
                    description={seoData.description}
                    canonical={seoData.canonical}
                    keywords={seoData.tags}
                    appName={appName}
                />
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
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
