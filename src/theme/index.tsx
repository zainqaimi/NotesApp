import React from 'react';
import { useColorScheme } from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
  MD3Theme,
} from 'react-native-paper';
import {
  DarkTheme as NavDark,
  DefaultTheme as NavLight,
  Theme as NavTheme,
} from '@react-navigation/native';

export type AppTheme = { paper: MD3Theme; nav: NavTheme };

export const makeTheme = (
  override: boolean | null,
  scheme: 'light' | 'dark',
): AppTheme => {
  const isDark = override !== null ? override : scheme === 'dark';
  const paperBase = isDark ? MD3DarkTheme : MD3LightTheme;
  const navBase = isDark ? NavDark : NavLight;

  const paper: MD3Theme = {
    ...paperBase,
    colors: {
      ...paperBase.colors,
      primary: isDark ? '#8ab4f8' : '#1e88e5',
    },
  };

  const nav: NavTheme = {
    ...navBase,
    colors: {
      ...navBase.colors,
      primary: paper.colors.primary,
      background: paper.colors.background,
      card: paper.colors.surface,
      text: paper.colors.onBackground,
      border: (paper.colors as any).outline ?? navBase.colors.border ?? '#000',
    },
  };

  return { paper, nav };
};

type ThemeBridgeProps = {
  override: boolean | null;
  children: React.ReactNode;
};

export const ThemeBridge: React.FC<ThemeBridgeProps> = ({
  override,
  children,
}) => {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const { paper } = makeTheme(override, scheme);
  return <PaperProvider theme={paper}>{children}</PaperProvider>;
};
