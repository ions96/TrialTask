import React from 'react';
import Container from '@component/Container';
import {useTranslation} from 'react-i18next';
import Box from '@component/Box';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStackParamList} from '@navigation/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export default function LoginScreen({navigation, route}: LoginScreenProps) {
  const inserts = useSafeAreaInsets();
  const {t} = useTranslation();

  return (
    <Container flex={1} backgroundColor="background">
      <Box height={inserts.top} />
    </Container>
  );
}
