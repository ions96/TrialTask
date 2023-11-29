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
import StackHeader from '@component/navigation/StackHeader';
// import LoginScreen from '@screen/LoginScreen';
import {useAppSelector} from './../store';
import {useTranslation} from 'react-i18next';
const RootNavigator = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigationContainer(
  props: AppNavigationContainerProps,
) {
  const theme = useTheme();
  const {t} = useTranslation();
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
            headerTintColor: theme.colors.text,
            headerStyle: {backgroundColor: theme.colors.header},
            header: StackHeader,
          }}
          initialRouteName={isAuthenticated ? 'Home' : 'Login'}>
          {/* <RootNavigator.Group
            screenOptions={{
              headerBackTitleVisible: false,
            }}>
            <RootNavigator.Screen
              name="Login"
              options={{headerShown: false}}
              component={LoginScreen}
            />
          </RootNavigator.Group> */}
          <RootNavigator.Group
            screenOptions={{
              headerBackTitleVisible: false,
              header: StackHeader,
            }}>
            <RootNavigator.Screen
              name="Home"
              options={{headerShown: false}}
              component={BottomTabNavigator}
            />
          </RootNavigator.Group>
        </RootNavigator.Navigator>
      </NavigationContainer>
    </>
  );
}
