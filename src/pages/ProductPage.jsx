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
  <div className='bg-[#f8fafb] min-h-[calc(100vh-300px)] flex items-center justify-center'>
    <div className='animate-pulse'>جارٍ التحميل...</div>
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
