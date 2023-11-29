import {StyleSheet, ViewProps} from 'react-native';
import React from 'react';
import {borderRadii, colors, spacing} from '@theme';
import Box, {BoxProps} from './Box';
import ActivityIndicator from './ActivityIndicator';

function Overlay({style, ...rest}: BoxProps & ViewProps) {
  return (
    <Box
      position="absolute"
      top={0}
      bottom={0}
      left={0}
      right={0}
      justifyContent="center"
      style={[styles.overlay, style]}
      {...rest}>
      <ActivityIndicator
        size="large"
        style={styles.indicator}
        color={colors.shadow}
      />
    </Box>
  );
}
export default React.memo(Overlay);

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    backgroundColor: colors.white,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  indicator: {
    padding: spacing.md,
    borderRadius: borderRadii.md,
  },
});
