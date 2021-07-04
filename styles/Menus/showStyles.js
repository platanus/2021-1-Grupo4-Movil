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
    color: colors.black,
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
    color: colors.black,
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
  modalView: {
    minHeight: '22%',
    maxHeight: '50%',
    minWidth: '80%',
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
  button: {
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    elevation: 2,
    backgroundColor: colors.kitchengramGreen500,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    width: '100%',
    fontSize: 14,
    color: colors.black,
    textAlign: 'center',
    marginVertical: 3,
  },
  modalTitle: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default styles;
