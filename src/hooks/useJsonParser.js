import { useMemo } from "react";

export default function useJsonParser(json, message = 'Error parsing JSON:') {
    const object = useMemo(() => {
      if (json === null || json === undefined) return {};
      // if it's already an object/array, return as-is
      if (typeof json === 'object') return json;
  
      try {
        return JSON.parse(String(json));
      } catch (error) {
        console.error(message, error);
        return {};
      }
    }, [json, message]);
  
    return object;
  }