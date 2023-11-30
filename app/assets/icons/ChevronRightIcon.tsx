import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg width={8} height={12} fill="none" {...props}>
    <Path
      fill="#3C3C43"
      fillOpacity={0.3}
      d="M7.85 6.007a.951.951 0 0 1-.083.398c-.056.122-.142.241-.258.357l-4.972 4.923a.904.904 0 0 1-.664.274.952.952 0 0 1-.971-.955c0-.266.102-.5.307-.706l4.358-4.291-4.358-4.292a.97.97 0 0 1-.307-.705.9.9 0 0 1 .282-.673.937.937 0 0 1 .69-.282c.26 0 .48.091.663.274L7.51 5.251c.227.216.34.468.34.756Z"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;
