import React, { createContext, useContext, useMemo, useState } from 'react';
import { DARK_THEME, LIGHT_THEME } from '../constants/theme';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState('light');

  const value = useMemo(() => {
    const theme = themeMode === 'dark' ? DARK_THEME : LIGHT_THEME;
    return {
      theme,
      themeMode,
      isDark: themeMode === 'dark',
      setThemeMode,
      toggleTheme: () => setThemeMode((mode) => (mode === 'dark' ? 'light' : 'dark')),
    };
  }, [themeMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return context;
}