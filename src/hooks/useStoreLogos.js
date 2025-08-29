import { pullZoneUrl } from "../config/Api";
import { useAppContext } from "../contexts/AppContext";

export function useStoreLogos() {
    const {storeDomain, storeDomainLoading} = useAppContext();
    const userId = storeDomain?.user_id;
    const {storelogoSvg, storelogoPng} = getMainLogo(userId);
    const {faviconLogo} = getFaviconLogo(userId);
    const {footerLogo} = getFooterLogo(userId);
    const defaultStoreLogo = process.env.REACT_APP_DEFAULT_STORE_LOGO;
    const defaultFaviconLogo = process.env.REACT_APP_DEFAULT_FAVICON_LOGO;

    return {storelogoSvg, storelogoPng, faviconLogo, footerLogo, defaultStoreLogo, defaultFaviconLogo, storeDomainLoading}
}

function getMainLogo(userId) {
    if(!userId) return {storelogoSvg: null, storelogoPng: null};
    const fullUserId = userId + 'dukanomar';
    const userIdBaseCode = btoa(fullUserId);
    const imgFolder = `uploads/${userIdBaseCode}`;
    const storelogoSvg = `${pullZoneUrl}${imgFolder}/deffault-logo.svg`;
    const storelogoPng = `${pullZoneUrl}${imgFolder}/deffault-logo.png`;

    return {storelogoSvg, storelogoPng}
}

function getFaviconLogo(userId) {
    if(!userId) return {faviconLogo: null};

    const fullUserId = userId + 'dukanomar';
    const userIdBaseCode = btoa(fullUserId);
    const imgFolder = `uploads/${userIdBaseCode}`;
    const faviconLogo = `${pullZoneUrl}${imgFolder}/deffault-favicon.png`;
    
    return {faviconLogo}
}

function getFooterLogo(userId) {
    if(!userId) return {footerLogo: null};
    
    const imgFolder = `uploads/${userId}`;
    const footerLogo = `https://dukanomar.com/${imgFolder}/footer-logo.png`;
    
    return {footerLogo}
}