import React from 'react';
import Container from '@component/Container';
import {CompositeBottomTabScreenProps} from '@navigation/types';
import {useTranslation} from 'react-i18next';
import Box from '@component/Box';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
type Props = CompositeBottomTabScreenProps<'Shop'>;
export default function ProfileScreen({}: Props) {
  const inserts = useSafeAreaInsets();
  const {t} = useTranslation();

  return (
    <Container flex={1} backgroundColor="background">
      <Box height={inserts.top} />
    </Container>
  );
}
