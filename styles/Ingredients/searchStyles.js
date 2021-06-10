import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: colors.kitchengramWhite,
    width: '100%',
    height: '100%',
    position: 'relative',
  },

  searchText: {
    fontSize: 14,
    color: colors.kitchengramBlack,
    width: '100%',
    marginBottom: 5,
  },

  container: {
    flex: 1,
    backgroundColor: colors.kitchengramWhite,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '5%',
    position: 'relative',
    paddingHorizontal: '5%',
    marginBottom: '5%',

  },

  responseContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  customPickerBox: {
    marginTop: 30,
    borderWidth: 2,
    borderColor: colors.kitchengramGreen500,
    height: 45,
    borderRadius: 5,
    width: '90%',
    marginHorizontal: '5%',
    marginBottom: 15,
    flexDirection: 'column',
  },

  arrowIcon: {
    position: 'absolute',
    top: '18%',
    left: '90%',
  },

  input: {
    width: '100%',
    height: '45%',
    marginTop: 5,
    borderWidth: 2,
    borderColor: colors.kitchengramGray600,
    borderRadius: 5,
    paddingHorizontal: 10,

  },

  scrapperButtonText: {
    color: colors.kitchengramWhite,
    fontSize: 16,
  },

  scrapperButton: {
    backgroundColor: colors.kitchengramGreen500,
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  productContainer: {
    minWidth: '100%',
    height: 90,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    borderBottomColor: colors.kitchengramGray400,
    borderBottomWidth: 1,
    paddingLeft: '7%',
  },

  even: {
    backgroundColor: colors.kitchengramWhite,
  },

  odd: {
    backgroundColor: colors.kitchengramWhite,
  },

  left: {
    width: '70%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  image: {
    width: 80,
    height: 80,
    marginRight: 5,
  },

  productName: {
    width: '72%',
    fontSize: 16,
    color: colors.kitchengramGray600,
    fontWeight: 'normal',
    fontStyle: 'normal',
    paddingLeft: 5,
  },

  right: {
    width: '25%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  price: {
    fontSize: 20,
    color: colors.kitchengramYellow500,
    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  measure: {
    fontSize: 12,
    color: colors.kitchengramGray400,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'right',
  },
});

export default styles;
