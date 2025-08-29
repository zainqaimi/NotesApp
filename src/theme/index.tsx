// import React from 'react';
// import { useColorScheme } from 'react-native';
// import {
//   MD3DarkTheme,
//   MD3LightTheme,
//   Provider as PaperProvider,
//   MD3Theme,
// } from 'react-native-paper';
// import {
//   DarkTheme as NavDark,
//   DefaultTheme as NavLight,
//   Theme as NavTheme,
// } from '@react-navigation/native';

// export type AppTheme = { paper: MD3Theme; nav: NavTheme };

// export const makeTheme = (
//   override: boolean | null,
//   scheme: 'light' | 'dark',
// ): AppTheme => {
//   const isDark = override !== null ? override : scheme === 'dark';
//   const paperBase = isDark ? MD3DarkTheme : MD3LightTheme;
//   const navBase = isDark ? NavDark : NavLight;

//   const paper: MD3Theme = {
//     ...paperBase,
//     colors: {
//       ...paperBase.colors,
//       primary: isDark ? '#8ab4f8' : '#1e88e5',
//     },
//   };

//   const nav: NavTheme = {
//     ...navBase,
//     colors: {
//       ...navBase.colors,
//       primary: paper.colors.primary,
//       background: paper.colors.background,
//       card: paper.colors.surface,
//       text: paper.colors.onBackground,
//       border: (paper.colors as any).outline ?? navBase.colors.border ?? '#000',
//     },
//   };

//   return { paper, nav };
// };

// type ThemeBridgeProps = {
//   override: boolean | null;
//   children: React.ReactNode;
// };

// export const ThemeBridge: React.FC<ThemeBridgeProps> = ({
//   override,
//   children,
// }) => {
//   const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
//   const { paper } = makeTheme(override, scheme);
//   return <PaperProvider theme={paper}>{children}</PaperProvider>;
// };

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  MD3LightTheme,
  MD3DarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavLightTheme,
  Theme as NavTheme,
} from '@react-navigation/native';
import { lightColors, darkColors } from './colors';

type Mode = 'system' | 'light' | 'dark';
const THEME_KEY = 'theme_mode_v1';

type ThemeContextType = {
  mode: Mode;
  setMode: (m: Mode) => void;
  colors: typeof lightColors;
};

const ThemeContext = createContext<ThemeContextType>({
  mode: 'system',
  setMode: () => {},
  colors: lightColors,
});

export const useAppTheme = () => useContext(ThemeContext);

export function makeTheme(scheme: 'light' | 'dark') {
  const colors = scheme === 'dark' ? darkColors : lightColors;

  const paper =
    scheme === 'dark'
      ? { ...MD3DarkTheme, colors: { ...MD3DarkTheme.colors, ...colors } }
      : { ...MD3LightTheme, colors: { ...MD3LightTheme.colors, ...colors } };

  const nav: NavTheme =
    scheme === 'dark'
      ? { ...NavDarkTheme, colors: { ...NavDarkTheme.colors, ...colors } }
      : { ...NavLightTheme, colors: { ...NavLightTheme.colors, ...colors } };

  return { paper, nav, colors };
}

export const ThemeBridge: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';

  const [mode, setMode] = useState<Mode>('system');

  // load from storage
  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY).then(val => {
      if (val === 'light' || val === 'dark' || val === 'system') setMode(val);
    });
  }, []);

  // persist
  useEffect(() => {
    AsyncStorage.setItem(THEME_KEY, mode).catch(() => {});
  }, [mode]);

  // decide scheme based on mode
  let finalScheme: 'light' | 'dark' = systemScheme;
  if (mode === 'light') finalScheme = 'light';
  if (mode === 'dark') finalScheme = 'dark';

  const { paper, nav, colors } = makeTheme(finalScheme);

  return (
    <ThemeContext.Provider value={{ mode, setMode, colors }}>
      <PaperProvider theme={paper}>
        {/*
          NavigationContainer ko App.tsx me rakhenge
          taki RootNavigator wahan attach ho
        */}
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};
