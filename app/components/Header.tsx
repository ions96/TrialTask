import React from 'react';
import Box from '@component/Box';
import BackButton from './navigation/BackButton';
import HeaderTitle from './navigation/HeaderTitle';
import HeaderBackground from './navigation/HeaderBackground';

interface Props {
  onPress: () => void;
  title: string;
  headerShadowVisible?: boolean;
}

export default function Header({onPress, title, headerShadowVisible}: Props) {
  return (
    <HeaderBackground headerShadowVisible={headerShadowVisible}>
      <Box flex={1} flexDirection="row" alignItems="center">
        <BackButton onPress={onPress} />
        <HeaderTitle title={title} />
      </Box>
    </HeaderBackground>
  );
}
