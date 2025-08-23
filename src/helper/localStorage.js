// utils/simpleStorage.js

/**
 * Read value from localStorage by key
 * @param {string} key
 * @param {any} fallback - value to return if key doesn't exist or parse fails
 */
export function readFromStorage(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }
  
  /**   
   * Add or update value in localStorage by key
   * @param {string} key
   * @param {any} value - will be JSON.stringify'ed
   */
  export function saveToStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore write errors (quota, private mode, etc.)
    }
  }
  