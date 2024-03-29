import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },

  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 15,
    paddingHorizontal: 18,
  },

  value: {
    fontSize: 18,
    color: colors.topNavbar,
    marginLeft: 10,
  },

  title: {
    width: '100%',
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.kitchengramBlack,
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 18,
  },

  recipeRow: {
    width: '100%',
    height: 90,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  recipeContainer: {
    width: '90%',
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  border: {
    borderTopColor: colors.grayName,
    borderTopWidth: 0.2,
  },

  left: {
    width: '70%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  recipeName: {
    width: '100%',
    fontSize: 18,
    fontWeight: '500',
    color: colors.kitchengramBlack,
    textAlign: 'left',
  },

  portions: {
    width: '100%',
    fontSize: 16,
    color: colors.grayName,
    textAlign: 'left',
  },

  right: {
    width: '30%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  price: {
    width: '100%',
    fontSize: 18,
    fontWeight: '500',
    color: colors.selectedTabYellow,
    textAlign: 'right',
  },

  moreVert: {
    paddingRight: 8,
  },

  inventoryButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    width: '90%',
    borderWidth: 1,
    marginLeft: '5%',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: colors.kitchengramGray600,
    borderColor: colors.kitchengramGray600,
  },

  inventoryButtonText: {
    fontSize: 16,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalViewSuccesful: {
    minHeight: '20%',
    minWidth: '60%',
  },
  modalView: {
    minHeight: '35%',
    maxHeight: '75%',
    width: '85%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 5,
    paddingHorizontal: 15,
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
  },
  bold: {
    fontWeight: '600',
  },
  modalTitle: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.kitchengramBlack,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  modalSubtitle: {
    width: '100%',
    fontSize: 15,
    color: colors.kitchengramBlack,
    textAlign: 'center',
    paddingBottom: 10,
  },
  modalScrollView: {
    minWidth: '100%',
  },
  modalButtonsContainer: {
    width: '100%',
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  acceptModalButtonContainer: {
    width: '100%',
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  cancelButton: {
    width: '48%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.kitchengramGray600,
  },
  confirmButton: {
    width: '48%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.kitchengramGreen500,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 15,
  },
  cancelButtonText: {
    color: colors.kitchengramGray600,
  },
  confirmButtonText: {
    color: colors.kitchengramWhite,
  },
  shoppingListButton: {
    backgroundColor: colors.kitchengramGreen500,
    padding: 12,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  shoppingListText: {
    color: colors.kitchengramWhite,
  },
});

export default styles;
