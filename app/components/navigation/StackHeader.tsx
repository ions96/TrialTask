import React from 'react';
import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import Box from '@component/Box';
import HeaderTitle from './HeaderTitle';
import HeaderBackground from './HeaderBackground';

export default function Header({options, route}: BottomTabHeaderProps) {
  const {title, headerTitle} = options;

  return (
    <HeaderBackground>
      <Box flex={1} alignItems="center" justifyContent={'center'}>
        <HeaderTitle title={headerTitle?.toString() ?? title ?? route.name} />
      </Box>
    </HeaderBackground>
  );
}
