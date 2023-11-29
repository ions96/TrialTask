import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
interface Props extends SvgProps {
  color?: string;
}
const PlusIcon = ({color, ...props}: Props) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke={color ? color : '#333'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 5v14M5 12h14"
    />
  </Svg>
);
export default PlusIcon;
