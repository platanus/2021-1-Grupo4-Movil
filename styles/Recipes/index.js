import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.kitchengramWhite,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  container2: {
    backgroundColor: colors.kitchengramWhite,
    flex: 1,
  },
  left: {
    width: '60%',
    height: '100%',
    paddingLeft: '5%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  right: {
    width: '35%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  name: {
    fontSize: 20,
    color: colors.kitchengramGray600,
  },
  recipeRow: {
    flex: 1.5,
    paddingTop: 20,
    paddingBottom: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: colors.kitchengramWhite,
    borderBottomColor: colors.kitchengramGray600,
    borderBottomWidth: 1,
    paddingLeft: '5%',
    paddingRight: '3%',
  },
  price: {
    fontSize: 24,
    color: colors.kitchengramYellow500,
  },
  subtitle: {
    fontSize: 14,
    color: colors.kitchengramGray400,
    paddingLeft: 5,
  },
  recipeInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },

  emptyMessage: {
    color: colors.kitchengramGray600,
    textAlign: 'center',
    paddingTop: 15,
    fontSize: 16 },
});

export default styles;
