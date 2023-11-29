import {
  BottomTabScreenProps,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigationContainerProps as NavigationContainerProps,
  NavigationState,
  NavigatorScreenParams,
  PartialRoute,
  Route,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

type AuthContinueRoutes = PartialRoute<
  Route<NavigationState<RootStackParamList>['routeNames'][number]>
>[];

export type RootStackParamList = {
  Home: NavigatorScreenParams<BottomTabScreenProps<BottomTabsParamList>>;
  Login?: {
    continue: AuthContinueRoutes;
  };
};

export type BottomTabsParamList = {
  Shop: undefined;
  Profile: undefined;
  Cart: undefined;
};

export type AppNavigationContainerProps = Omit<
  NavigationContainerProps & {
    theme?: Theme | undefined;
    fallback?: React.ReactNode;
    documentTitle?: DocumentTitleOptions | undefined;
    onReady?: (() => void) | undefined;
  } & {
    ref?: React.Ref<NavigationContainerRef<RootParamList>> | undefined;
  },
  'children'
>;

export type CompositeBottomTabScreenProps<S extends keyof BottomTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabsParamList, S>,
    NativeStackScreenProps<RootStackParamList>
  >;

// export type RootNavigationProp<
//   RouteName extends keyof RootStackParamList = string,
// > = NativeStackNavigationProp<RootStackParamList, RouteName>;

// export type BottomNavigationProp<
//   RouteName extends keyof BottomTabsParamList = string,
// > = BottomTabNavigationProp<BottomTabsParamList, RouteName> &
//   RootNavigationProp;
