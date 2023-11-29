import {Theme} from '@theme';
import {createBox, BoxProps as RestyleBoxProps} from '@shopify/restyle';

const Box = createBox<Theme>();

type BoxProps = RestyleBoxProps<Theme>;
export type {BoxProps};

export default Box;
