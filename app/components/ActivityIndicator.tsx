import {useTheme} from '@theme';
import React from 'react';
import {
  ActivityIndicator as RNActivityIndicator,
  ActivityIndicatorProps,
} from 'react-native';

export const ActivityIndicator = (props: ActivityIndicatorProps) => {
  const theme = useTheme();
  return <RNActivityIndicator color={theme.colors.primary} {...props} />;
};

export default ActivityIndicator;
