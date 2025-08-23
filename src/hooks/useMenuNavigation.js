import { useEffect, useMemo, useRef, useState } from "react";
import useJsonParser from "./useJsonParser";
import { useCartContext } from "../contexts/cartContext";

export default function useMenuNavigation(menuItems = [], menuSetting) {
    const [menuOpen, setMenuOpen] = useState(false);
    const {count} = useCartContext()
    const historyRef = useRef([]); // Array of indexes for current path
    const [currentMenu, setCurrentMenu] = useState({
      items: menuItems,
      title: "MAIN MENU"
    });
  
    // Update currentMenu when menuItems changes
    useEffect(() => {
      if (menuItems && menuItems.length > 0) {
        setCurrentMenu({
          items: menuItems,
          title: "MAIN MENU"
        });
        // Reset history when menuItems changes
        historyRef.current = [];
      }
    }, [menuItems]);

    const isMain = historyRef.current.length === 0;
    const mainPageSlug = historyRef.current.length === 0
      ? ''
      : menuItems[historyRef.current[0]]?.page_slug || '';
  
    const settings = useJsonParser(menuSetting?.header?.[0]?.settings, 'Failed to parse header settings:');
    const { header_text = ''} = settings;
    // Handle window resize and scroll
    useEffect(() => {
      const mainHeader = document.querySelector('.main-header');
      const navbar = document.querySelector('.header-bar');

      const handleScroll = () => {
        if (!mainHeader || !navbar) return;

        if (window.scrollY > 0) {
          mainHeader.classList.add('is-scrolled');
        } else {
          mainHeader.classList.remove('is-scrolled');
        }
      };

      const handleResize = () => {
        const isMobile = window.innerWidth < 1024;
        const navMenu = document.querySelector('.nav-menu');
  
        if (!isMobile && navMenu?.classList.contains('open')) {
          navMenu.classList.remove('open');
        }
  
        if (!isMobile && menuOpen) {
          setMenuOpen(false)
        }
      };
  
      // Add event listeners
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
  
      // Initial call to set correct state
      handleScroll();
      handleResize();
  
      // Cleanup
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }, [menuOpen, header_text]); 

    // Go to submenu
    const goToSubmenu = (index) => {
      historyRef.current.push(index);
      const result = historyRef.current.reduce((acc, idx) => {
        const nextItem = acc.items[idx];
        return {
          items: nextItem?.children || [],
          title: nextItem?.text || acc.title
        };
      }, { items: menuItems, title: "MAIN MENU" });
      setCurrentMenu(result);
    };
  
    // Go back
    const goBack = () => {
      historyRef.current.pop();
      const result = historyRef.current.reduce((acc, idx) => {
        const nextItem = acc.items[idx];
        return {
          items: nextItem?.children || [],
          title: nextItem?.text || acc.title
        };
      }, { items: menuItems, title: "MAIN MENU" });
      setCurrentMenu(result);
    };

    // Reset to default (MAIN MENU)
    const resetMenu = () => {
      historyRef.current = [];
      setCurrentMenu({
        items: menuItems,
        title: "MAIN MENU",
      });
    };


    return {
        currentMenu,      // { items: [...], title: '...' }
        isMain,
        mainPageSlug,
        settings,
        history: historyRef.current, // read-only array (mutable)
        count,
        goToSubmenu,
        goBack,
        resetMenu,
        menuOpen, 
        setMenuOpen
      };
}