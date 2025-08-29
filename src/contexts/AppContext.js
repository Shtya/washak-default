import { createContext, useContext, } from 'react';
import { useMenu } from '../hooks/globalSettings/useMenu';
import { useMenuSettings } from '../hooks/globalSettings/useMenuSettings';
import { useStoreOptions } from '../hooks/globalSettings/useStoreOptions';
import { useApiGet } from '../config/Api';
const AppContext = createContext();

export function AppProvider({ children }) {
  
  const { data: menuData = {}, loading: loadingMenu } = useMenu();
  const { data: menuSettingData  = {}, loading: loadingSetting } = useMenuSettings();
  const { data: storeOptionsData = {}, loading: optionsLoading } = useStoreOptions();
  const { data: storeDomainData = {}, loading: storeDomainLoading } = useApiGet('/get-store-domain-info');

  const menu = menuData?.data;
  const menuSetting = menuSettingData?.data;
  const storeOptions = storeOptionsData?.data;
  const storeDomain = storeDomainData?.data;

  const value = { menu, loadingMenu, menuSetting, loadingSetting , storeOptions,optionsLoading,storeDomain,storeDomainLoading };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook to use context easily
export function useAppContext() {
  
  const context = useContext(AppContext);
  if (!context)
    throw new Error(
      "AppContext was used outside of AppProvider"
    );
  return context;
}