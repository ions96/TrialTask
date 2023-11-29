import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Text, {TextProps} from '@component/Text';
import {borderRadii, useTheme, colors, spacing} from '@theme';
import Box from './Box';

interface Props extends TouchableOpacityProps {
  dark?: boolean;
  title?: string;
  textVariant?: TextProps['variant'];
  isLoading?: boolean;
}

export default function Button({
  style,
  dark,
  title,
  textVariant = 'bodyLarge',
  disabled,
  isLoading,
  ...props
}: Props) {
  const theme = useTheme();
  const isDark = dark !== undefined ? dark : theme.dark;
  const textColor = isDark ? colors.white : theme.colors.text;
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      disabled={disabled || isLoading}
      style={[styles.container, style]}
      {...props}>
      <Text variant={textVariant} style={{color: textColor}}>
        {title}
      </Text>

      {isLoading && (
        <Box position="absolute" right={spacing.md}>
          <ActivityIndicator color={textColor} />
        </Box>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadii.md,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nonFlex: {flex: 0},
});
