import { Platform } from 'react-native';
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
    },
    inputAndroid: {
      color: colors.kitchengramBlack,
      paddingTop: 13,
      paddingLeft: 15,
      paddingBottom: 12,
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
      top: Platform.OS === 'ios' ? '17%' : 0,
      right: 3,
    },
  },
  providerPicker: {
    inputIOS: {
      textAlign: 'left',
      color: colors.kitchengramGreen500,
      paddingTop: 10,
      marginHorizontal: 10,
      fontSize: 16,

    },
    inputAndroid: {
      textAlign: 'left',
      color: colors.kitchengramGreen500,
      paddingTop: 40,
      marginHorizontal: 10,
      fontSize: 16,
    },
    placeholderColor: colors.kitchengramGreen500,
    iconContainer: {
      top: Platform.OS === 'ios' ? '23%' : '20%',
      right: '10%',
    },
  },
};

export default pickers;
