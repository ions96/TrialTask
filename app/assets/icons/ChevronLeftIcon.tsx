import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {memo} from 'react';
const ChevronLeftIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill="#333"
      d="m8 0 1.41 1.41L3.83 7H16v2H3.83l5.58 5.59L8 16 0 8l8-8Z"
    />
  </Svg>
);
const Memo = memo(ChevronLeftIcon);
export default Memo;
