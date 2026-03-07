// src/theme/ThemeContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  useColorScheme,
  Platform,
  StatusBar,
  Appearance,
} from 'react-native';
import { useColorScheme as useNativeWindScheme } from 'nativewind';
import { themeStorage } from './storage'; 

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  isDark: boolean;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);
const THEME_KEY = 'app_theme_mode';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemScheme = useColorScheme();
  const { setColorScheme } = useNativeWindScheme();

  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    const saved = themeStorage.get(THEME_KEY);
    return (saved as ThemeMode) ?? 'system';
  });

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      if (themeMode === 'system') {
        applyTheme('system', colorScheme === 'dark');
      }
    });
    return () => sub.remove();
  }, [themeMode]);

  const isDark = useMemo(() => {
    return themeMode === 'system'
      ? systemScheme === 'dark'
      : themeMode === 'dark';
  }, [themeMode, systemScheme]);

  const applyTheme = useCallback(
    (mode: ThemeMode, systemDark: boolean) => {
      const dark = mode === 'system' ? systemDark : mode === 'dark';

       setColorScheme(dark ? 'dark' : 'light');

      StatusBar.setBarStyle(
        dark ? 'light-content' : 'dark-content',
        true
      );

      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(
           dark ? '#333337' : '#FFFFFF', 
          true
        );
        StatusBar.setTranslucent(false);
      }
    },
    [setColorScheme]
  );

  useEffect(() => {
    applyTheme(themeMode, systemScheme === 'dark');
  }, [isDark]);

  const setThemeMode = useCallback(
    (mode: ThemeMode) => {
      setThemeModeState(mode);
      themeStorage.set(THEME_KEY, mode); 
      applyTheme(mode, systemScheme === 'dark');
    },
    [systemScheme, applyTheme]
  );

  return (
    <ThemeContext.Provider value={{ isDark, themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);