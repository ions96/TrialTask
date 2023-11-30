import React, {forwardRef, useCallback} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import {borderRadii, fonts, spacing, useTheme} from '@theme';
import Text from './Text';
import Box from './Box';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export interface TextInputProps extends RNTextInputProps {
  error?: string;
  endIconSize?: number;
  EndIcon?: React.ElementType;
  onPressEndIcon?: () => void;
  onPress?: () => void;
  required?: boolean;
  placeholderNumberOfLines?: number;
  showCounter?: boolean;
  inputHeight?: number;
  autoCorrect?: boolean;
  spacingTop?: number;
}
const GAP = spacing.md;

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      error,
      onPressEndIcon,
      placeholder,
      value,
      required,
      EndIcon,
      endIconSize = 24,
      hitSlop = {top: 14, bottom: 14, left: spacing.lg, right: spacing.lg},
      style,
      placeholderNumberOfLines,
      multiline,
      maxLength,
      onFocus,
      onBlur,
      onChangeText,
      inputHeight = 18,
      autoCorrect,
      spacingTop,
      ...props
    }: TextInputProps,
    ref,
  ) => {
    const theme = useTheme();
    const shouldShowError = !!error;
    const spacingEnd = GAP + (EndIcon ? endIconSize + spacing.md : 0);
    const focus = useSharedValue(!(value === '' || value === undefined));
    const placeholderSize = useSharedValue(0);
    const counterTranslateX = useSharedValue(0);
    const counterLengthError = useSharedValue(0);

    const handlePlaceholderLayout = useCallback(
      ({nativeEvent}: any) => {
        const {width} = nativeEvent.layout;
        placeholderSize.value = width;
      },
      [placeholderSize],
    );

    const animatedFocus = useDerivedValue(() => {
      return withTiming(
        focus.value || (value !== '' && value !== undefined) ? 1 : 0,
        {
          duration: 200,
        },
      );
    }, [value]);

    const handleFocus = useCallback(
      (e: any) => {
        focus.value = true;
        onFocus?.(e);
      },
      [focus, onFocus],
    );
    const handleBlur = useCallback(
      (e: any) => {
        focus.value = false;
        counterLengthError.value = 0;
        onBlur?.(e);
      },
      [counterLengthError, focus, onBlur],
    );

    const _onChangeText = useCallback(
      (t: string) => {
        if (maxLength && t.length > maxLength) {
          counterTranslateX.value = withSequence(
            withTiming(10, {duration: 100}),
            withTiming(-10, {duration: 100}),
            withTiming(10, {duration: 100}),
            withTiming(0, {duration: 100}),
          );
          counterLengthError.value = 1;
        } else {
          counterLengthError.value = 0;
        }
        onChangeText?.(t.substring(0, maxLength));
      },
      [counterLengthError, counterTranslateX, maxLength, onChangeText],
    );
    const placeholderStyle = useAnimatedStyle(() => {
      return {
        top: interpolate(animatedFocus.value, [0, 1], [5, -3]),
        fontSize: interpolate(animatedFocus.value, [0, 1], [14, 10]),
        lineHeight: interpolate(animatedFocus.value, [0, 1], [18, 14]),
      };
    });
    const animatedPlaceholderSpacerStyles = useAnimatedStyle(() => ({
      width: interpolate(
        animatedFocus.value,
        [0, 1],
        [0, placeholderSize.value + 2 * spacing.md],
        Extrapolate.CLAMP,
      ),
      left: -spacing.md,
    }));

    return (
      <>
        {error ? (
          <Text
            variant="inputRegular"
            style={[styles.txterror, {color: theme.colors.error}]}>
            {error}
          </Text>
        ) : null}
        <View
          style={[
            styles.container,
            {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.white,
              paddingEnd: spacingEnd,
              marginTop: spacingTop ? spacingTop : 0,
            },
            shouldShowError && {borderColor: theme.colors.error},
            style,
          ]}>
          <Box flexDirection="row">
            <Box flex={1} style={styles.textinputWrap}>
              <Animated.View style={animatedPlaceholderSpacerStyles} />
              <Animated.View
                onLayout={handlePlaceholderLayout}
                style={styles.placeholderContainer}
                pointerEvents="none">
                <Animated.Text
                  numberOfLines={placeholderNumberOfLines}
                  style={[
                    styles.placeholder,
                    {
                      color: theme.colors.gray,
                    },
                    placeholderStyle,
                  ]}>
                  {placeholder}
                  {required && (
                    <Animated.Text
                      style={[
                        styles.placeholder,
                        {color: theme.colors.textError},
                        placeholderStyle,
                      ]}>
                      *
                    </Animated.Text>
                  )}
                </Animated.Text>
              </Animated.View>

              <RNTextInput
                ref={ref}
                underlineColorAndroid={'rgba(0,0,0,0)'}
                hitSlop={hitSlop}
                multiline={multiline}
                {...props}
                value={value}
                placeholder={undefined}
                style={[
                  styles.textinput,
                  {color: theme.colors.text},
                  style,
                  {height: inputHeight},
                ]}
                autoCorrect={autoCorrect}
                selectionColor={theme.colors.primary}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={_onChangeText}
              />
            </Box>
          </Box>

          {EndIcon ? (
            <TouchableOpacity
              onPress={onPressEndIcon}
              style={styles.endIconBtn}
              hitSlop={{bottom: 10, top: 10, left: 10, right: 10}}>
              <EndIcon
                size={endIconSize}
                width={endIconSize}
                height={endIconSize}
                color={theme.colors.gray}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </>
    );
  },
);
export default React.memo(TextInput);

const styles = StyleSheet.create({
  endIconBtn: {
    position: 'absolute',
    right: GAP,
    top: 16,
    justifyContent: 'center',
  },
  container: {
    minHeight: 52,
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: borderRadii.lg,
    paddingHorizontal: GAP,
  },
  textinput: {
    ...fonts.inputRegular,
    padding: 0,
    margin: 3,
    height: 18,
  },
  placeholder: {
    ...fonts.inputRegular,
  },
  placeholderContainer: {
    position: 'absolute',
    zIndex: 99,
  },

  textinputWrap: {
    paddingVertical: 7,
    paddingBottom: 0,
  },
  txterror: {
    width: '100%',
    textAlign: 'right',
  },
});
