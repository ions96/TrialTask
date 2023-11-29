import React from 'react';
import {View, StyleSheet, ViewProps, ViewStyle} from 'react-native';
import {useTheme, colors} from '@theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

export const HEADER_HEIGHT = 56;
interface Props extends ViewProps {
  headerStyle?: ViewStyle;
  headerShadowVisible?: boolean;
}
function HeaderBackground({
  children,
  style,
  headerStyle,
  headerShadowVisible = true,
  ...rest
}: Props) {
  const theme = useTheme();
  const {top} = useSafeAreaInsets();

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={['rgba(127, 215, 224, 0.5)', 'rgba(156, 161, 245, 0.6)']}
      style={[styles.header, {paddingTop: top}, headerStyle]}>
      <View style={[{height: HEADER_HEIGHT}, style]} {...rest}>
        {children}
      </View>
    </LinearGradient>
  );
}
export default React.memo(HeaderBackground);

const styles = StyleSheet.create({
  header: {
    zIndex: 1,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10.0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: colors.white,
  },
});
