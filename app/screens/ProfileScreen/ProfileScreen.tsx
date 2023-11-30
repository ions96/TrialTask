import React, {useCallback} from 'react';
import Container from '@component/Container';
import {CompositeBottomTabScreenProps} from '@navigation/types';
import {useTranslation} from 'react-i18next';
import Box from '@component/Box';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useUser from '@hooks/user';
import {logout} from '@store/auth';
import {useAppDispatch} from '@store';
import PrimaryButton from '@component/PrimaryButton';
import FastImage from 'react-native-fast-image';
import ChevronRightIcon from '@icons/ChevronRightIcon';
import Text from '@component/Text';
import {View, StyleSheet, Alert, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
type Props = CompositeBottomTabScreenProps<'Profile'>;
export default function ProfileScreen({navigation}: Props) {
  const inserts = useSafeAreaInsets();
  const {t} = useTranslation();
  const user = useUser();
  const dispath = useAppDispatch();
  const onPressLogout = useCallback(() => {
    Alert.alert('', t('t_app_confirm'), [
      {
        text: t('t_app_cancel'),
        style: 'cancel',
      },
      {
        text: t('t_app_yes'),
        style: 'destructive',
        onPress: () => {
          dispath(logout());
          navigation.navigate('Login');
        },
      },
    ]);
  }, [dispath, navigation, t]);
  return (
    <Container
      backgroundColor="background"
      paddingHorizontal={'md'}
      alignItems={'center'}>
      <Box height={inserts.top} />
      <FastImage
        source={require('./../../assets/images/photoprofil.png')}
        style={styles.img}
        resizeMode="cover"
      />
      <View style={styles.containerdates}>
        <View style={styles.fitem}>
          <View>
            <Text variant="regular17" color="black">
              {t('t_app_username')}
            </Text>
            <Text variant="regular15" color="gray" mt="xs">
              {user?.email}
            </Text>
          </View>
          <ChevronRightIcon />
        </View>
        <View style={styles.item}>
          <View>
            <Text variant="regular17" color="black">
              {t('t_app_email')}
            </Text>
            <Text variant="regular15" color="gray" mt="xs">
              {user?.email}
            </Text>
          </View>
          <ChevronRightIcon />
        </View>
        <View style={styles.item}>
          <View>
            <Text variant="regular17" color="black">
              {t('t_app_pass')}
            </Text>
            <Text variant="regular15" color="gray" mt="xs">
              *******
            </Text>
          </View>
          <ChevronRightIcon />
        </View>
      </View>
      <PrimaryButton
        onPress={onPressLogout}
        title={t('t_app_logout')}
        style={styles.margint}
      />
    </Container>
  );
}
const styles = StyleSheet.create({
  img: {
    height: 80,
    width: 80,
  },
  margint: {
    marginTop: 40,
  },
  containerdates: {
    width: width - 32,
    backgroundColor: '#fff',
    paddingVertical: 8,
    alignItems: 'flex-end',
    borderRadius: 10,
    marginTop: 30,
  },
  fitem: {
    width: width - 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 18,
    paddingTop: 8,
  },
  item: {
    width: width - 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 18,
    paddingTop: 8,
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(60, 60, 67, 0.2)',
  },
});
