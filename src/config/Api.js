

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Notification } from './Notification';


export const BaseUrl =
  process.env.REACT_APP_BASE_URL || 'https://dukanomar.com/api';

export const baseImage =
  process.env.REACT_APP_BASE_IMAGE || 'https://cdn.washak.net/';

export const pullZoneUrl =
  process.env.REACT_APP_BUNNY_PULL_ZONE_NAME || 'https://cdn.washak.net/';

export const storageUrl =
  process.env.REACT_APP_BUNNY_STORAGE_URL || 'https://cdn.washak.net/';


const getStoreDomain = () => {
  const isLocal = window.location.hostname === 'localhost';
  return isLocal ? 'ahmed-shtya.dukanomar.com' : window.location.hostname;
};

export const api = axios.create({
  baseURL: BaseUrl,
  headers: {
    'X-Store-Domain': getStoreDomain(),
  },
});

export async function BaseFetch(
    url,
    init = {}
  ) {
    try {
        
        const headers = new Headers(init?.headers || {});
        headers.set('X-Store-Domain', getStoreDomain());

        let response = await fetch(`${BaseUrl}${url}`, {
          ...init,
          signal: init.signal,
          headers
        });
    
        const data = await response.json();
        if (data.status_code >= 400 && data.status_code < 600) {
          const err = new Error(data.message || `Error ${data.status_code}`);
          (err).statusCode = data.status_code;
          (err).payload    = data;
          throw err;
        }
        
        return data;
      } catch (err) {
                // treat fetch AbortError and other libs' cancel codes as "cancelled"
        const isAbort = err && (err.name === 'AbortError' ); 
            
        if (isAbort) {
            console.log('❌ Request was cancelled');
        } else {
            console.error('🔥 Request failed:', err);
        }
    
        throw err;
      }
  }


export const useApiGet = (url, successMsg, errorMsg) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const isMountedRef = useRef(true);
  
    useEffect(() => {
      isMountedRef.current = true;
      const controller = new AbortController();
  
      const fetchData = async () => {
        if (!url) {
          if (isMountedRef.current) setLoading(false);
          return;
        }
  
        setLoading(true);
        setError(null);
  
        try {
          const response = await BaseFetch(url, { signal: controller.signal });
          if (isMountedRef.current) {
            setData(response);
            if (successMsg) Notification(successMsg, 'success');
          }
        } catch (err) {
          // ignore abort
          if (err && (err.name === 'AbortError' || err.code === 'ERR_CANCELED')) {
            return;
          }
  
          if (isMountedRef.current) {
            setError(err);
            if (errorMsg) Notification(errorMsg, 'error');
          }
        } finally {
          if (isMountedRef.current) setLoading(false);
        }
      };
  
      fetchData();
  
      return () => {
        isMountedRef.current = false;
        controller.abort();
      };
    }, [url, successMsg, errorMsg]);
  
    return { data, loading, error };
  };
