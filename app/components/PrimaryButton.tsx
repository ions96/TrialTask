import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Text, {TextProps} from '@component/Text';
import {borderRadii, colors, spacing} from '@theme';
import Box from './Box';

interface Props extends TouchableOpacityProps {
  dark?: boolean;
  plusicon?: boolean;
  title?: string;
  textVariant?: TextProps['variant'];
  textColor?: TextProps['color'];
  isLoading?: boolean;
}

export default function PrimaryButton({
  style,
  title,
  textVariant = 'primaryButton',
  textColor = 'white',
  disabled,
  isLoading,
  ...props
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      disabled={disabled || isLoading}
      style={[styles.container, style]}
      {...props}>
      <Text variant={textVariant} color={textColor}>
        {title}
      </Text>

      {isLoading && (
        <Box position="absolute" right={spacing.md}>
          <ActivityIndicator color={colors.white} />
        </Box>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadii.md,
    flexDirection: 'row',
    paddingHorizontal: 20,
    minWidth: 110,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.mainBlue,
  },
});
