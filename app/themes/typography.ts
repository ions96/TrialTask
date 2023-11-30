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
  primaryButton: {
    ...mediumType,
    lineHeight: 16,
    fontSize: 14,
  },
  headerMedium: {
    ...headerType,
    fontSize: 18,
  },
};
