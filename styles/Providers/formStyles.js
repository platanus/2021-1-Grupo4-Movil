import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.kitchengramWhite,
    height: '87%',
    width: '100%',
    paddingTop: 15,
    paddingHorizontal: '5%',
  },

  inputContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: 15,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: colors.kitchengramBlack,
    marginBottom: 5,
  },

  input: {
    width: '100%',
    height: 50,
    borderColor: colors.kitchengramGray600,
    borderWidth: 2,
    borderRadius: 5,
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: colors.kitchengramBlack,
  },

  buttonsContainer: {
    height: '13%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: '5%',
    paddingVertical: 10,
    backgroundColor: colors.kitchengramWhite,
  },

  button: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancel: {
    width: '48%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.kitchengramGray600,
  },

  confirm: {
    width: '48%',
    backgroundColor: colors.kitchengramGreen500,
    borderRadius: 5,
  },

  buttonText: {
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 16,
  },

  cancelText: {
    color: colors.kitchengramGray600,
  },

  confirmText: {
    color: colors.kitchengramWhite,
  },
});

export default styles;
