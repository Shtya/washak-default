// hooks/useIsActiveLink.js
import { useLocation, useSearchParams } from "react-router-dom";

export function useIsActiveLink(fullPath) {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  if (!fullPath) return false;

  // Normalize by removing trailing slashes
  const normalize = (url) => url.replace(/\/+$/, "");

  const currentPath = location.pathname;
  const targetPath = fullPath.split("?")[0];

  // Check base path match
  if (currentPath !== targetPath) return false;

  // If target includes query params, ensure they match too
  const targetQuery = new URLSearchParams(fullPath.split("?")[1] || "");
  for (const [key, value] of targetQuery.entries()) {
    if (searchParams.get(key) !== value) return false;
  }

  return true;
}
