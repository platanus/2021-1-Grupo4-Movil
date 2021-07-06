import { StyleSheet } from 'react-native';
import colors from './appColors';

const styles = StyleSheet.create({
  backgroundOpacity: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  bankAccountPopUp: {
    height: 450,
    width: '90%',
    backgroundColor: colors.kitchengramWhite,
    borderColor: colors.kitchengramGreen500,
    borderWidth: 2,
    marginBottom: '15%',
    borderRadius: 10,
    paddingHorizontal: '5%',
    paddingTop: 15,
  },

  container: {
    backgroundColor: colors.kitchengramWhite,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 15,
    flex: 1,
    paddingHorizontal: '5%',
  },

  bankButton: {
    backgroundColor: colors.kitchengramWhite,
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.kitchengramGreen500,
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },

  bankButtonText: {
    color: colors.kitchengramGreen500,
    fontSize: 16,
  },

  attributeContainer: {
    height: '12%',
    borderBottomColor: colors.kitchengramGray400,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  name: {
    width: '35%',
    textAlign: 'left',
    fontSize: 14,
    color: colors.kitchengramGray600,
    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  value: {
    width: '65%',
    textAlign: 'right',
    fontSize: 20,
    color: colors.kitchengramGray600,
    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  linkValue: {
    width: '65%',
    textAlign: 'right',
    fontSize: 20,
    color: colors.blue,
    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  buttonsContainer: {
    width: '100%',
    height: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    marginHorizontal: '5%',
    paddingVertical: '5%',
  },

  bankButtonsContainer: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    marginHorizontal: '5%',
    paddingVertical: '5%',
  },

  delete: {
    width: '48%',
    height: '100%',
    backgroundColor: colors.kitchengramRed500,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteText: {
    color: colors.kitchengramWhite,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 16,
  },

  edit: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    height: '100%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.kitchengramGray600,
  },

  editText: {
    color: colors.kitchengramGray600,

    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 16,
  },
});

export default styles;
