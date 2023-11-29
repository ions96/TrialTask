/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';
import {BottomTabsParamList, RootStackParamList} from './types';
import {useTheme} from '@theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import HomeIcon from '@icons/HomeIcon';
import ProfileIcon from '@icons/ProfileIcon';
import CartIcon from '@icons/CartIcon';

import ShopScreen from '@screen/ShopScreen';
import ProfileScreen from '@screen/ProfileScreen';
import CartScreen from '@screen/CartScreen';

const Tab = createBottomTabNavigator<BottomTabsParamList>();
export default function App({}: NativeStackScreenProps<
  RootStackParamList,
  'Home'
>) {
  const {t} = useTranslation();
  const theme = useTheme();
  const inserts = useSafeAreaInsets();

  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        headerTintColor: theme.colors.text,
        headerStyle: {backgroundColor: theme.colors.header},
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: {
          lineHeight: 24,
          fontSize: 12,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
        },
        tabBarIconStyle: {
          flex: 0,
          height: 30,
        },
        tabBarStyle: {
          height: 60 + inserts.bottom,
        },
        // tabBarBadgeStyle: {
        //   backgroundColor: theme.colors.primary,
        //   fontSize: 8,
        //   fontFamily: 'Onest-Regular',
        //   color: theme.colors.textReversed,
        //   top: -2,
        //   left: 4,
        //   paddingHorizontal: 2,
        //   lineHeight: 15 - 1,
        //   height: 15,
        //   minWidth: 15,
        //   transform: [],
        //   borderRadius: 8,
        //   borderWidth: 1,
        //   borderColor: theme.colors.header,
        // },
      }}>
      <Tab.Screen
        name="Shop"
        options={{
          title: t('t_app_shop'),
          tabBarIcon: props => <HomeIcon {...props} />,
          headerShown: false,
        }}
        component={ShopScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{
          title: t('t_app_profile'),
          tabBarIcon: props => <ProfileIcon {...props} />,
          headerShown: false,
        }}
        component={ProfileScreen}
      />
      <Tab.Screen
        name="Cart"
        options={{
          title: t('t_app_cart'),
          tabBarIcon: props => <CartIcon {...props} />,
          headerShown: false,
        }}
        component={CartScreen}
      />
    </Tab.Navigator>
  );
}
