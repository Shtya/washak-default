import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "../../components/molecules/AppLayout";
import ScrollToTop from "../../components/atoms/ScrollToTop";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("../../pages/Home"));
const ContactUsPage = lazy(() => import("../../pages/ContactUs"));
const Cart = lazy(() => import("../../pages/Cart"));
const Products = lazy(() => import("../../pages/Products"));
const DynamicPage = lazy(() => import("../../pages/DynamicPage"));
const NotFoundPage = lazy(() => import("../../pages/NotFound"));
const ThankYouPage = lazy(() => import("../../pages/thank-you-page"));
const UpsellProducts = lazy(() => import("../../pages/UpsellProducts"));
const ProductPage = lazy(() => import("../../pages/ProductPage"));


export function AppRoutes() {

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<div class="loader-container">
                <span class="loader"></span>
            </div>
            }>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path="/" index element={<Home />} />
                        <Route path="/contact-us" element={<ContactUsPage />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/thank-you-page" element={<ThankYouPage />} />
                        <Route path="/pages/:page" element={<DynamicPage />} />
                        <Route path="/product/:id" element={<ProductPage />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/upsells/:productId/:orderId" element={<UpsellProducts />} />

                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}