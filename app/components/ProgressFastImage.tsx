import React from 'react';
import {createImageProgress} from 'react-native-image-progress';
import FastImage, {FastImageProps, ImageStyle} from 'react-native-fast-image';
import ActivityIndicator from '@component/ActivityIndicator';
import {StyleProp, ViewStyle} from 'react-native';

const Image = createImageProgress(FastImage);

type ProgressFastImageProps = FastImageProps & {
  errorContainerStyle?: StyleProp<ViewStyle>;
  indicator?: React.ComponentType;
  indicatorContainerStyle?: StyleProp<ViewStyle>;
  indicatorProps?: any;
  renderIndicator?: (
    progress: number,
    indeterminate: boolean,
  ) => React.ReactElement;
  renderError?: (error: Error) => React.ReactElement;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  threshold?: number;
};

export const ProgressFastImage = (props: ProgressFastImageProps) => {
  return <Image indicator={ActivityIndicator} {...props} />;
};

export default ProgressFastImage;
