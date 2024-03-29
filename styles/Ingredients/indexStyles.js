import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.kitchengramWhite,
    flex: 1,
  },

  ingredientRow: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomColor: colors.kitchengramGray400,
    borderBottomWidth: 1,
  },

  even: {
    backgroundColor: colors.kitchengramWhite,
  },

  row: {
    flexDirection: 'row',
  },

  odd: {
    backgroundColor: colors.kitchengramWhite,
  },

  left: {
    width: '65%',
    height: '100%',
    paddingLeft: '5%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  name: {
    fontSize: 20,
    color: colors.kitchengramGray600,
    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  measure: {
    fontSize: 12,
    color: colors.kitchengramGray400,

    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  right: {
    width: '35%',
    height: '100%',
    paddingRight: '5%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  navIcon: {
    paddingRight: 8,
    color: colors.kitchengramWhite,
  },

  emptyMessage: {
    color: colors.kitchengramGray600,
    textAlign: 'center',
    paddingTop: 15,
    fontSize: 16,
  },

  price: {
    fontSize: 24,
    color: colors.kitchengramYellow500,

    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  addButton: {
    backgroundColor: colors.kitchengramGreen500,
    width: 45,
    height: 45,
    borderRadius: 50,
    position: 'absolute',
    right: 25,
    bottom: '10%',
    alignItems: 'center',
  },

  plus: {
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '300',
    color: '#FFFFFF',
    paddingTop: 3,
    paddingLeft: 2,
  },
  inventory: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  decreaseInventoryBtn: {
    width: 40,
    left: 16,
    display: 'flex',
  },
  increaseInventoryBtn: {
    width: 40,
  },
  inventoryEditPanel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    left: 5,
  },
  inventoryInput: {
    width: 50,
    textAlign: 'center',
    borderColor: colors.kitchengramGray400,
    borderWidth: 2,
    borderRadius: 5,
  },
  saveInventoryButton: {
    display: 'flex',
    width: 80,
    borderColor: colors.kitchengramGray400,
    borderWidth: 2,
    textAlign: 'center',
    borderRadius: 5,
    color: colors.kitchengramGray600,
  },
});

export default styles;
