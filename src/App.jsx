import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useLayoutEffect, useState } from 'react';
import Lottie from 'lottie-react';
import lottieAnimation from './lottie/Cart Glassmorphism.json';
import { AppProviders } from './config/providers/AppProviders';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import { BaseFetch } from './config/Api';
import { applyCssVarsFromObject } from './helper/color';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: -120, // Triggers animations a bit earlier
    });
  }, []);

  const { toasts } = useToasterStore();
  const TOAST_LIMIT = process.env.REACT_APP_TOAST_LIMIT || 3

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);


  useLayoutEffect(() => {
    const raw = localStorage.getItem('store_color_template');
    if (!raw) return;

    try {
      const colorGroups = JSON.parse(raw);
      applyCssVarsFromObject(colorGroups);
    } catch (err) {
      console.error('Failed to apply store color template:', err);
    }
  }, []);


  useEffect(() => {
    async function fetchColorTemplate() {
      try {
        const response = await BaseFetch('/get-store-color-template');
        if (response?.status_code === 200 && response?.data?.style) {
          const styleData = response.data.style;
          localStorage.setItem('store_color_template', JSON.stringify(styleData));
          applyCssVarsFromObject(styleData); // ✅ Apply CSS vars immediately
        } else {
          console.warn('Failed to fetch store color template:', response?.message || response?.error);
        }
      } catch (error) {
        console.error('Error fetching store color template:', error);
      }
    }

    fetchColorTemplate();
  }, []);


  return (
    <AppProviders>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          maxToasts: 3, // ✅ limit to 3
        }}
      />
    </AppProviders>
  );
}

export default App;
