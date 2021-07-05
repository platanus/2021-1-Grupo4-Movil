import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingTop: 15,
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
