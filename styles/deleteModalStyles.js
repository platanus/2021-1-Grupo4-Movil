import { StyleSheet } from 'react-native';
import colors from './appColors';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    maxHeight: '70%',
    minWidth: '80%',
    maxWidth: '80%',
    margin: 20,
    backgroundColor: colors.kitchengramWhite,
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
  modalText: {
    width: '100%',
    fontSize: 14,
    color: colors.kitchengramBlack,
    textAlign: 'center',
    marginVertical: 3,
    fontWeight: 'bold',
  },

  modalTitle: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.kitchengramBlack,
    textAlign: 'center',
    marginVertical: 10,
  },
  modalDescription: {
    minWidth: '100%',
    fontSize: 16,
    color: colors.kitchengramBlack,
    textAlign: 'left',
    marginBottom: 20,
  },
  modalDescription2: {
    minWidth: '100%',
    fontSize: 16,
    color: colors.kitchengramBlack,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtonsContainer: {
    width: '100%',
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButtonsContainer2: {
    width: '60%',
    height: 35,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  cancelButton: {
    minWidth: '48%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.kitchengramGray600,
  },
  confirmButton: {
    minWidth: '48%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.kitchengramRed500,
    borderRadius: 5,
  },
  confirmButton2: {
    minWidth: '48%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.kitchengramGreen500,
    borderRadius: 5,
  },

  buttonText: {
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 16,
  },
  cancelButtonText: {
    color: colors.kitchengramGray600,
  },
  confirmButtonText: {
    color: colors.kitchengramWhite,
  },

});

export default styles;
