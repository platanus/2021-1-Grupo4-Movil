import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.kitchengramWhite,
    flex: 1,
  },

  emptyMessage: {
    color: colors.kitchengramGray600,
    textAlign: 'center',
    paddingTop: 15,
    fontSize: 16,
  },

  inventoryRow: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomColor: colors.kitchengramGray400,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
  },

  left: {
    width: '65%',
    height: '100%',
    paddingLeft: '1%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  right: {
    width: '35%',
    height: '100%',
    paddingRight: '10%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
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
    left: 40,
  },
  inventoryInput: {
    width: 50,
    textAlign: 'center',
    borderColor: colors.kitchengramGray400,
    borderWidth: 2,
    borderRadius: 5,
  },

  name: {
    fontSize: 20,
    color: colors.kitchengramGray600,
    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  text: {
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  measure: {
    fontSize: 18,
    color: colors.kitchengramGray400,

    fontWeight: 'normal',
    fontStyle: 'normal',
  },
  price: {
    fontSize: 24,
    color: colors.kitchengramYellow500,

    fontWeight: 'normal',
    fontStyle: 'normal',
  },
  containerCentered: {
    paddingVertical: 5,
    marginTop: '5%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  buttonAccept: {
    position: 'relative',
    width: '90%',
    marginLeft: '5%',
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.kitchengramGreen500,
    borderRadius: 5,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  acceptButtonText: {
    color: colors.kitchengramWhite,
    fontSize: 16,
  },
});

export default styles;
