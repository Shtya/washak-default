// utils/path.js
export function getFullPath(page_slug, href) {
  if (!page_slug && !href) return "#";

  // External links: http, https, mailto, tel
  if (href && /^(https?:|mailto:|tel:)/.test(href)) {
    return href;
  }

  // Category links
  if (page_slug?.startsWith("category")) {
    return `/products?category=${href || ""}`;
  }

  // Default case
  return page_slug
    ? `/${page_slug}${href || ""}`
    : href?.startsWith("/")  ? href : `/${href || ""}`;
}
