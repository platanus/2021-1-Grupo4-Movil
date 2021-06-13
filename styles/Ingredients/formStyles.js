import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({

  keyboardAvoiding: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.kitchengramWhite,
  },

  container: {
    paddingHorizontal: '5%',
    backgroundColor: colors.kitchengramWhite,
    minHeight: '100%',
    paddingTop: 15,
  },

  inputContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: 15,
    backgroundColor: colors.kitchengramWhite,
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

  dropDown: {
    width: '100%',
    height: 50,
    borderColor: colors.kitchengramGray600,
    borderWidth: 2,
    borderRadius: 5,
    paddingRight: 10,
    justifyContent: 'center',
  },

  dropDownText: {
    width: '100%',
    height: '100%',
    fontSize: 16,
  },

  arrowIcon: {
    position: 'absolute',
    top: '45%',
    left: '87%',
  },

  buttonsContainer: {
    paddingHorizontal: '5%',
    height: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    backgroundColor: colors.kitchengramWhite,
  },

  button: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scrapperButton: {
    backgroundColor: colors.kitchengramGreen500,
    padding: 12,
    borderRadius: 5,
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10 },

  scrapperButtonText: {
    color: colors.kitchengramWhite,
    fontSize: 16,
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
