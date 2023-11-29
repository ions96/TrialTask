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
import PlusIcon from './../assets/icons/PlusIcon';

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
  plusicon,
  ...props
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      disabled={disabled || isLoading}
      style={[styles.container, style]}
      {...props}>
      {plusicon ? <PlusIcon color={'#fff'} /> : null}
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
    borderRadius: borderRadii.lg,
    flexDirection: 'row',
    width: '100%',
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.mainBlue,
  },
});
