const typeface = {
  regular: 'SF-Pro-Display-Regular',
  medium: 'SF-Pro-Display-Medium',
  bold: 'SF-Pro-Display-Bold',
  light: 'SF-Pro-Display-Light',
};
const mediumType = {
  fontFamily: typeface.medium,
  letterSpacing: 0.15,
  fontWeight: undefined,
};
const boldType = {
  fontFamily: typeface.bold,
  letterSpacing: 0.15,
  fontWeight: undefined,
};
const headerType = {
  fontFamily: typeface.bold,
  letterSpacing: 0,
  fontWeight: undefined,
};
export const fonts = {
  mediumchat14: {
    ...mediumType,
    fontSize: 14,
    lineHeight: 18,
  },
  bold18: {
    ...boldType,
    lineHeight: 24,
    fontSize: 18,
  },
  bodyLarge: {
    ...boldType,
    lineHeight: 28,
    fontSize: 18,
  },
  primaryButton: {
    ...mediumType,
    lineHeight: 16,
    fontSize: 14,
  },
  headerBold: {
    ...headerType,
    fontSize: 18,
  },
};
