const typeface = {
  regular: 'SFProDisplay-Regular',
  medium: 'SFProDisplay-Medium',
  bold: 'SFProDisplay-Bold',
  light: 'SFProDisplay-Light',
};
const mediumType = {
  fontFamily: typeface.medium,
  letterSpacing: 0.15,
  fontWeight: undefined,
};
const regularType = {
  fontFamily: typeface.regular,
  letterSpacing: 0.15,
  fontWeight: undefined,
};
const boldType = {
  fontFamily: typeface.bold,
  letterSpacing: 0.15,
  fontWeight: undefined,
};
const headerType = {
  fontFamily: typeface.medium,
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
  mediumchat18: {
    ...mediumType,
    lineHeight: 18,
    fontSize: 18,
  },
  mediumchat12: {
    ...mediumType,
    lineHeight: 12,
    fontSize: 12,
  },
  primaryButton: {
    ...mediumType,
    lineHeight: 16,
    fontSize: 14,
  },
  butMedium: {
    ...mediumType,
    lineHeight: 16,
    fontSize: 14,
  },
  headerMedium: {
    ...headerType,
    fontSize: 18,
  },
  inputRegular: {
    ...regularType,
    lineHeight: 18,
    fontSize: 14,
  },
  smallRegular: {
    ...regularType,
    fontSize: 12,
  },
  regular17: {
    ...regularType,
    fontSize: 17,
  },
  regular15: {
    ...regularType,
    fontSize: 15,
  },
  medium18: {
    ...mediumType,
    fontSize: 18,
  },
  medium32: {
    ...mediumType,
    fontSize: 32,
  },
  menuRegular: {
    ...regularType,
    fontSize: 14,
  },
};
