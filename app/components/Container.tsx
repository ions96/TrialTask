import React from 'react';

import Box, {BoxProps} from '@component/Box';
import {ViewProps} from 'react-native';

export default function Container({style, ...props}: BoxProps & ViewProps) {
  return <Box bg="white" style={style} {...props} />;
}
