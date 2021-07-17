import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    backgroundColor: colors.kitchengramWhite,
    minHeight: '100%',
    paddingTop: 15,
  },

  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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

  inputUnitContainer: {
    width: '40%',
    marginRight: '5%',
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: 5,
    backgroundColor: colors.kitchengramWhite,
  },

  inputNewMeasureContainer: {
    width: '86%',
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: colors.kitchengramWhite,
    marginRight: '5%',
  },

  measureLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: colors.kitchengramBlack,
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

  buttonsContainer: {
    paddingHorizontal: '5%',
    height: 65,
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

  buttonContainer: {
    width: '99%',
    height: 65,
    paddingVertical: 10,
  },

  addUnit: {
    bottom: 15,
    width: '48%',
    backgroundColor: colors.kitchengramYellow500,
    borderRadius: 5,
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
