import colors from './appColors';

const pickers = {
  customPickerStyles: {
    inputWeb: {
      color: '#AAAAAA',
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12,
      borderColor: '#AAAAAA',
      borderWidth: 2,
      borderRadius: 5,
      fontSize: 16,
      paddingLeft: 15,
      paddingRight: 15,
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    inputIOS: {
      color: '#111111',
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12,
      fontWeight: 'bold',
    },
    inputAndroid: {
      color: '#111111',
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12,
      width: '100%',
      height: '60%',
      borderColor: '#AAAAAA',
      borderWidth: 2,
      borderRadius: 5,
      fontSize: 16,
      fontWeight: 'bold',
    },
    placeholderColor: '#111111',
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
  },
  providerPicker: {
    inputIOS: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12,
    },
    inputAndroid: {
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
    },
    placeholderColor: colors.white },
};

export default pickers;
