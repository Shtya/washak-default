// import { useParams } from "react-router-dom";
// import Product from "./Product";

// export default function ProductPage() {
//     const { id } = useParams();
//     return <Product key={id} />;
// }

import { useParams } from 'react-router-dom';
import Product from './Product';
import { Suspense, lazy } from 'react';

// Lazy load the heavy product component
const LazyProduct = lazy(() => import('./Product'));

// Simple loading component for suspense
const ProductLoading = () => (
  <div className="loader-container">
    <span className="loader"></span>
  </div>
);

export default function ProductPage() {
  const { id } = useParams();

  return (
    <Suspense fallback={<ProductLoading />}>
      <LazyProduct key={id} />
    </Suspense>
  );
}
