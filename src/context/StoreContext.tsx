import { createContext, useContext, useEffect } from 'react';
import storeData from '../data/store.json';

type StoreData = typeof storeData;

const StoreContext = createContext<StoreData>(storeData);


export const StoreProvider = ({ children }: {children: React.ReactNode }) => {
  const store = storeData;
  
  useEffect(() => {
    const { fontHeading, fontBody, fontAccent, primaryColor, bgAccentColor, accentColor, darkAccentColor } = store.theme;

    const fonts = [fontHeading, fontBody, fontAccent].filter(Boolean)
    .map(f => f.replace(/\s+/g, '+') + ':wght@400;600;700')
    .join('&family=');

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${fonts}&display=swap`;
    document.head.appendChild(link);

    const root = document.documentElement
    root.style.setProperty('--font-heading', `'${fontHeading}', serif`)
    root.style.setProperty('--font-body',    `'${fontBody}', sans-serif`)
    root.style.setProperty('--font-accent',    `'${fontAccent}', sans-serif`)
    root.style.setProperty('--bg', primaryColor)
    root.style.setProperty('--dark-accent', darkAccentColor)
    root.style.setProperty('--accent',  accentColor)
    root.style.setProperty('--bg-accent',  bgAccentColor)

    return () => void document.head.removeChild(link)
  }, []);

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );

}
  
export const useStore = () => useContext(StoreContext);
