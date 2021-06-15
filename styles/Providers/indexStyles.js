import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.kitchengramWhite,
    flex: 1,
  },

  providerRow: {
    width: '100%',
    height: 90,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomColor: colors.kitchengramGray400,
    borderBottomWidth: 1,
  },

  even: {
    backgroundColor: colors.kitchengramWhite,
  },

  odd: {
    backgroundColor: colors.kitchengramWhite,
  },

  left: {
    width: '90%',
    height: '100%',
    paddingLeft: '5%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  name: {
    fontSize: 20,
    color: colors.kitchengramGray600,
    fontWeight: '500',
    fontStyle: 'normal',
    marginBottom: 10,
  },

  phone: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  phoneText: {
    fontSize: 15,
    color: colors.gray,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecorationLine: 'underline',
  },

  right: {
    width: '10%',
    height: '100%',
    paddingRight: '5%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
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
});

export default styles;
