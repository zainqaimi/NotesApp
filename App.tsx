import React, { useEffect } from 'react';
import { initDB } from './src/database/sqlite';
import { getCurrentUser } from './src/database/db';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { ThemeBridge, makeTheme } from './src/theme';
import { useColorScheme } from 'react-native';

const AppInner = () => {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const { nav } = makeTheme(scheme);

  useEffect(() => {
    initDB();
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const user = await getCurrentUser();
      console.log('Current Session User:', user);
    };
    checkSession();
  }, []);

  return (
    <NavigationContainer theme={nav}>
      <RootNavigator />
    </NavigationContainer>
  );
};

const App = () => (
  <ThemeBridge>
    <AppInner />
  </ThemeBridge>
);

export default App;
