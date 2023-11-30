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
import StackHeader from '@component/navigation/StackHeader';
import ShopScreen from '@screen/ShopScreen';
import ProfileScreen from '@screen/ProfileScreen';
import CartScreen from '@screen/CartScreen';
import useCart from '@hooks/useCartActions';

const Tab = createBottomTabNavigator<BottomTabsParamList>();
export default function App({}: NativeStackScreenProps<
  RootStackParamList,
  'Home'
>) {
  const {t} = useTranslation();
  const theme = useTheme();
  const inserts = useSafeAreaInsets();
  const {getCartItems, calculateCartTotal} = useCart();
  const cartItemsLength = getCartItems().length;
  const totalPrice = calculateCartTotal();
  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray,
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: {
          lineHeight: 18,
          fontSize: 12,
          fontFamily: 'SFProDisplay-Medium',
        },
        tabBarItemStyle: {
          justifyContent: 'center',
        },
        tabBarIconStyle: {
          flex: 0,
          height: 24,
        },
        tabBarStyle: {
          height: 54 + inserts.bottom,
        },
        tabBarBadgeStyle: {
          backgroundColor: theme.colors.red,
          fontSize: 8,
          fontFamily: 'SFProDisplay-Bold',
          color: theme.colors.white,
          top: -5,
          left: 7,
          paddingHorizontal: 2,
          lineHeight: 15 - 1,
          height: 15,
          minWidth: 15,
          transform: [],
          borderRadius: 8,
          borderWidth: 1,
          borderColor: theme.colors.white,
        },
        header: props => <StackHeader {...props} />,
      }}>
      <Tab.Screen
        name="Shop"
        options={{
          title: t('t_app_shop'),
          headerTitle: t('t_app_bestshop'),
          tabBarIcon: props => <HomeIcon {...props} />,
        }}
        component={ShopScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{
          title: t('t_app_profile'),
          headerTitle: t('t_app_account'),
          tabBarIcon: props => <ProfileIcon {...props} />,
        }}
        component={ProfileScreen}
      />
      <Tab.Screen
        name="Cart"
        options={{
          title: t('t_app_cart'),
          headerTitle: t('t_app_totalprice') + totalPrice,
          tabBarBadge: cartItemsLength,
          tabBarIcon: props => <CartIcon {...props} />,
        }}
        component={CartScreen}
      />
    </Tab.Navigator>
  );
}
