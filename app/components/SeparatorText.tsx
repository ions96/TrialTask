import {StyleSheet, View} from 'react-native';
import React from 'react';
import Text from './Text';
import {colors} from '@theme';
interface Props {
  label: string;
}
export default function SeparatorText({label}: Props) {
  return (
    <View style={styles.cont}>
      <View style={styles.separator}></View>
      <Text variant="menuRegular" paddingHorizontal={'lg'}>
        {label}
      </Text>
      <View style={styles.separator}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    borderWidth: 0.7,
    borderColor: colors.gray,
    width: '36%',
  },
  cont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
