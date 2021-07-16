import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
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

  inputWithPrefixContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    borderColor: colors.kitchengramGray600,
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
  },

  prefixInput: {
    width: '100%',
    height: '100%',
    fontStyle: 'normal',
    color: colors.kitchengramBlack,
    fontSize: 14,
  },

  prefix: {
    paddingRight: 2,
    color: 'black',
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
    height: '90%',
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

  sectionTitleText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
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

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 25,
  },

  modalView: {
    minHeight: '20%',
    maxHeight: '50%',
    minWidth: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalTitle: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.kitchengramBlack,
    textAlign: 'center',
    marginBottom: 10,
  },

  modalButtonContainer: {
    width: '100%',
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  confirmButton: {
    width: '48%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.kitchengramGreen500,
    borderRadius: 5,
  },

  confirmButtonText: {
    color: colors.kitchengramWhite,
  },
});

export default styles;
