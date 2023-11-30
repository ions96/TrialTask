import React, {useState, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import Container from '@component/Container';
import PrimaryButton from '@component/PrimaryButton';
import {useTranslation} from 'react-i18next';
import TextInput from '@component/TextInput';
import Text from '@component/Text';
import {loginSuccess} from '@store/auth';
import {useAppDispatch} from '@store';
import {RootStackParamList} from '@navigation/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationState, PartialState} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import EyeIcon from '@icons/EyeIcon';
import SimpleToast from 'react-native-simple-toast';
import Box from '@component/Box';
type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export default function LoginScreen({navigation, route}: LoginScreenProps) {
  const {t} = useTranslation();
  const dispath = useAppDispatch();
  const inserts = useSafeAreaInsets();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setisPasswordHidden] = useState(true);
  const togglePasswordVisibility = useCallback(() => {
    setisPasswordHidden(p => !p);
  }, []);

  // const onSuccess = useCallback(
  //   (response: AxiosResponse) => {
  //     dispath(loginSuccess(response?.data));

  //     let routes: PartialState<NavigationState<RootStackParamList>>['routes'] =
  //       [{name: 'Home'}];
  //     const _continue = route.params?.continue;
  //     if (_continue) {
  //       routes = _continue;
  //     }
  //     navigation.reset({index: routes.length - 1, routes});
  //   },
  //   [dispath, navigation, route.params?.continue],
  // );

  // const loginMutation = useMutation<
  //   AxiosResponse<User>,
  //   AxiosError<{message: string}>,
  //   LoginRequestPayload['user']
  // >(
  //   data => {
  //     return auth(data);
  //   },
  //   {
  //     onSuccess: data => {
  //       onSuccess(data);
  //     },
  //     onError: error => {
  //       setLogin('');
  //       setPassword('');
  //     },
  //   },
  // );

  // const onSubmit = useCallback(() => {
  //   loginMutation.mutate({pass: password, login: login});
  // }, [login, loginMutation, password]);

  const onSubmitHard = useCallback(() => {
    if (login === '') {
      SimpleToast.show(t('t_app_enteremail'), 2);
      return;
    }
    dispath(loginSuccess({id: 1, email: login, name: login, token: login}));
    let routes: PartialState<NavigationState<RootStackParamList>>['routes'] = [
      {name: 'Home'},
    ];
    const _continue = route.params?.continue;
    if (_continue) {
      routes = _continue;
    }
    navigation.reset({index: routes.length - 1, routes});
  }, [login, dispath, navigation, route, t]);

  return (
    <Container flex={1} bg="background" paddingHorizontal={'md'}>
      <Box height={inserts.top} />
      <Text variant="medium32" color={'black'} marginTop={'lg'}>
        {t('t_app_login')}
      </Text>

      <Box mt="md">
        <TextInput
          value={login}
          onChangeText={setLogin}
          placeholder={t('t_app_email')}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </Box>
      <Box mt="md">
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={isPasswordHidden}
          placeholder={t('t_app_pass')}
          EndIcon={isPasswordHidden ? EyeIcon : EyeIcon}
          onPressEndIcon={togglePasswordVisibility}
        />
      </Box>

      <PrimaryButton
        onPress={onSubmitHard}
        title={t('t_app_login')}
        style={styles.primaryButton}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  primaryButton: {marginTop: 20},
  secundaryButton: {
    marginTop: 20,
  },
  appletop: {
    marginTop: 20,
  },
});
