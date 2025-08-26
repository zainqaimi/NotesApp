import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { ThemeBridge, makeTheme } from './src/theme';
import { useColorScheme } from 'react-native';

const App = () => {
  // manual theme toggle (SQLite me persist next step me)
  const [darkOverride, setDarkOverride] = useState<boolean | null>(null);
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const { nav } = makeTheme(darkOverride, scheme);

  return (
    <ThemeBridge override={darkOverride}>
      <NavigationContainer theme={nav}>
        <RootNavigator />
      </NavigationContainer>
    </ThemeBridge>
  );
};

export default App;
