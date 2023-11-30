import React, {useRef} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList, AppNavigationContainerProps} from './types';
import BottomTabNavigator from './BottomTabNavigator';
import {useTheme} from '@theme';
import {StatusBar} from 'react-native';
import LoginScreen from '@screen/LoginScreen';
import {useAppSelector} from './../store';
const RootNavigator = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigationContainer(
  props: AppNavigationContainerProps,
) {
  const theme = useTheme();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const routeNameRef = useRef<string | null>(null);
  const navigationRef =
    useRef<NavigationContainerRef<RootStackParamList> | null>(null);
  return (
    <>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.header}
      />
      <NavigationContainer
        {...props}
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current =
            navigationRef.current?.getCurrentRoute()?.name || 'unknown';
        }}
        onStateChange={async () => {
          const currentRouteName =
            navigationRef.current?.getCurrentRoute()?.name;
          routeNameRef.current = currentRouteName || 'unknown';
        }}>
        <RootNavigator.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={isAuthenticated ? 'Home' : 'Login'}>
          <RootNavigator.Group>
            <RootNavigator.Screen name="Login" component={LoginScreen} />
          </RootNavigator.Group>
          <RootNavigator.Group>
            <RootNavigator.Screen name="Home" component={BottomTabNavigator} />
          </RootNavigator.Group>
        </RootNavigator.Navigator>
      </NavigationContainer>
    </>
  );
}
