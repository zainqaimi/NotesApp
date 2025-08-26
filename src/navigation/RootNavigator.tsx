import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import HomeTab from '../screens/tabs/HomeTab';
import CompletedTab from '../screens/tabs/CompletedTab';
import SettingsTab from '../screens/tabs/SettingsTab';
import { enableScreens } from 'react-native-screens';
import AddEditTaskScreen from '../screens/tabs/AddEditTaskScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

enableScreens();

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
  AddEditTask: { taskId?: number } | undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="Signup"
      component={SignupScreen}
      options={{ title: 'Create account' }}
    />
  </AuthStack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="HomeTab"
      component={HomeTab}
      options={{
        title: 'Home',
        tabBarIcon: ({ size }) => <Icon name="home-outline" size={size} />,
      }}
    />
    <Tab.Screen
      name="CompletedTab"
      component={CompletedTab}
      options={{
        title: 'Completed',
        tabBarIcon: ({ size }) => (
          <Icon name="check-circle-outline" size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="SettingsTab"
      component={SettingsTab}
      options={{
        title: 'Settings',
        tabBarIcon: ({ size }) => <Icon name="cog-outline" size={size} />,
      }}
    />
  </Tab.Navigator>
);

const RootNavigator: React.FC = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {/* Splash decides where to go (Onboarding/Auth/Main) */}
      <RootStack.Screen name="Splash" component={SplashScreen} />
      <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
      <RootStack.Screen name="Auth" component={AuthNavigator} />
      <RootStack.Screen name="Main" component={MainTabs} />
      {/* FAB se open hone wali stack screen */}
      <RootStack.Screen
        name="AddEditTask"
        component={AddEditTaskScreen}
        options={{ presentation: 'modal', headerShown: true, title: 'Task' }}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
