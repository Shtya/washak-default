// hooks/useProductsWithCategories.js
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useStoreProducts } from "./useStoreProducts";
import { useStoreCategories } from "../useStoreCategories";
import { baseImage } from "../../config/Api";

function getDiscountLabel(product) {
  const special = Number(product?.price?.special_price || 0);
  const regular = Number(product?.price?.regular_price || 0);

  if (special && regular && special < regular) {
    const discount = 100 - (special / regular) * 100;
    const rounded = Number(discount.toFixed(0));
    if (rounded > 0) {
      return `خصم ${rounded}%`;
    }
  }
  return null;
}

export function useProductsWithCategories() {
  const [searchParams, setSearchParams] = useSearchParams();

  // read query params
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentCategory = searchParams.get("category") || "all";

  // API calls
  const { data: storedProducts, loading: productsLoading, error: productsError, refetch: refetchProducts } = useStoreProducts(currentPage);
  const { data: categoriesData, loading: categoriesLoading, error: categoriesError, refetch: refetchCategories  } = useStoreCategories();

  // breadcrumb
  const breadcrumbRoutes = useMemo(
    () => [{ label: "الرئيسية", href: "/" }, { label: "جميع المنتجات" }],
    []
  );

  // update page
  const setPage = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    setSearchParams(params);
  };

  // update category
  const setCategory = (slug) => {
    const params = new URLSearchParams(searchParams);
    if (slug && slug !== "all") {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    params.set("page", 1);
    setSearchParams(params);
  };

  // categories
  const categories = useMemo(() => {
    const result = [{ key: "all", label: "جميع المنتجات", slug: null }];
    if (categoriesData?.data) {
      categoriesData.data.forEach((category) => {
        result.push({
          key: category.id.toString(),
          slug: category.slug,
          label: category.name,
        });
      });
    }
    return result;
  }, [categoriesData]);

  console.log(storedProducts?.data?.data)
  // products
  const products = useMemo(() => {
    
    return (
      storedProducts?.data?.data?.map((product) => {
        let secondImageUrl = ''
    if(product?.preview?.media?.url){
      const previewUrl = product?.preview?.media?.url;
      const secondImage = product?.medias?.find(im => im?.url != previewUrl);
      if(secondImage ){
        secondImageUrl = secondImage?.url;
      }
    }
        return {
        id: product?.id,
        image: product?.preview?.media?.url
          ? baseImage + product?.preview?.media?.url
          : null,
        secondImage: secondImageUrl
          ? baseImage + secondImageUrl
          : null,
        discountLabel: getDiscountLabel(product),
        cta: product?.categories?.[0]?.name || "منتج",
        type: product?.categories?.[0]?.slug || "all",
        title: product?.title,
        originalPrice: product?.price?.regular_price,
        salePrice: product?.price?.price,
        slug: product?.slug,
        stockStatus: product?.stock?.stock_status,
        fakeStock: product?.price?.fake_product_stock
          ? JSON.parse(product?.price.fake_product_stock)
          : null,
  }}) || []
    );
  }, [storedProducts]);

  const isAll = currentCategory === "all";
  // filter by category
  const filteredData =
      isAll
      ? products
      : products.filter((p) => p.type === currentCategory);

  // pagination (this logic og get total is temperary)
  const pageCount =
    Math.ceil((isAll ? storedProducts?.data?.total : filteredData?.length) / storedProducts?.data?.per_page) || 1;

  return {
    breadcrumbRoutes,
    currentPage,
    currentCategory,
    categories,
    categoriesLoading,
    products,
    filteredData,
    pageCount,
    productsLoading,
    productsError,
    categoriesError,
    refetchCategories,
    refetchProducts,
    setPage,
    setCategory,
  };
}
