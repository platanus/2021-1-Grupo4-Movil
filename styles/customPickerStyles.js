import colors from './appColors';

const pickers = {
  customPickerStyles: {
    inputWeb: {
      color: colors.kitchengramBlack,
      paddingTop: 13,
      paddingLeft: 15,
      paddingBottom: 12,
      fontWeight: 'bold',
    },
    inputIOS: {
      color: colors.kitchengramBlack,
      paddingTop: 13,
      paddingLeft: 15,
      paddingBottom: 12,
      fontWeight: 'bold',
    },
    inputAndroid: {
      color: colors.kitchengramBlack,
      paddingTop: 13,
      paddingLeft: 15,
      paddingBottom: 12,
      fontWeight: 'bold',
    },
    placeholderColor: 'colors.kitchengramBlack',
    underline: { borderTopWidth: 0 },
    icon: {
      position: 'absolute',
      backgroundColor: 'transparent',
      borderTopWidth: 5,
      borderTopColor: '#00000099',
      borderRightWidth: 5,
      borderRightColor: 'transparent',
      borderLeftWidth: 5,
      borderLeftColor: 'transparent',
      width: 0,
      height: 0,
      top: 20,
      right: 15,
    },
    iconContainer: {
      top: 5,
    },
  },
  providerPicker: {
    inputIOS: {
      color: colors.kitchengramGreen500,
      textAlign: 'center',
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12,
      fontSize: 16,

    },
    inputAndroid: {
      textAlign: 'center',
      color: colors.kitchengramGreen500,
      paddingTop: 20,
      paddingBottom: 13,
      marginHorizontal: 10,
      fontSize: 16,
    },
    placeholderColor: colors.kitchengramGreen500,
  },
};

export default pickers;
