import React from 'react';
import {StyleSheet, TextProps as RNTextProps} from 'react-native';
import {createText, TextProps as RestyleTextProps} from '@shopify/restyle';
import {Theme} from '@theme';

const ThemedText = createText<Theme>();
export type TextProps = RestyleTextProps<Theme>;
export default function Text({style, ...props}: TextProps & RNTextProps) {
  return (
    <ThemedText
      variant="bodyLarge"
      color="text"
      style={[styles.text, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  text: {},
});
