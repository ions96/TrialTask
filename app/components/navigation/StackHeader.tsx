import React from 'react';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import Box from '@component/Box';
import BackButton from './BackButton';
import HeaderTitle from './HeaderTitle';

export default function Header({
  navigation,
  options,
  route,
}: NativeStackHeaderProps) {
  const {title} = options;

  return (
    <Box flex={1} flexDirection="row" alignItems="center">
      <BackButton onPress={navigation.goBack} />
      <HeaderTitle title={title ?? route.name} />
      <Box mr="md" />
    </Box>
  );
}
