import React from 'react';
import {View, StyleSheet, ViewProps, ViewStyle} from 'react-native';
import {colors} from '@theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const HEADER_HEIGHT = 38;
interface Props extends ViewProps {
  headerStyle?: ViewStyle;
}
function HeaderBackground({children, style, headerStyle, ...rest}: Props) {
  const {top} = useSafeAreaInsets();

  return (
    <View style={[styles.header, {paddingTop: top}, headerStyle]}>
      <View style={[{height: HEADER_HEIGHT}, style]} {...rest}>
        {children}
      </View>
    </View>
  );
}
export default React.memo(HeaderBackground);

const styles = StyleSheet.create({
  header: {
    zIndex: 1,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1.0,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
});
