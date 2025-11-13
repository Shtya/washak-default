import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { AppLayout } from "../../components/molecules/AppLayout";
import Home from "../../pages/Home";
import ContactUsPage from "../../pages/ContactUs";
import Cart from "../../pages/Cart";
import Products from "../../pages/Products";
import Product from "../../pages/Product";
import DynamicPage from "../../pages/DynamicPage";
import NotFoundPage from "../../pages/NotFound";
import ThankYouPage from "../../pages/thank-you-page";
import ScrollToTop from "../../components/atoms/ScrollToTop";
import UpsellProducts from "../../pages/UpsellProducts";

function ProductWithKey() {
    const { id } = useParams();
    return <Product key={id} />;
}



export function AppRoutes() {

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" index element={<Home />} />
                    <Route path="/contact-us" element={<ContactUsPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/thank-you-page" element={<ThankYouPage />} />
                    <Route path="/pages/:page" element={<DynamicPage />} />
                    <Route path="/product/:id" element={<ProductWithKey />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/upsells/:productId/:orderId" element={<UpsellProducts />} />

                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}