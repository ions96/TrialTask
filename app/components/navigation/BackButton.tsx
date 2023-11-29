import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import Box from '@component/Box';
import ChevronLeftIcon from '@icons/ChevronLeftIcon';

export default function BackButton(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity {...props}>
      <Box paddingHorizontal={'md'} paddingTop={'sm'}>
        <ChevronLeftIcon />
      </Box>
    </TouchableOpacity>
  );
}
