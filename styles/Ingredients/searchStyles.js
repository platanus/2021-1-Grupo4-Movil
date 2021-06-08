import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: colors.figmaWhite,
    width: '100%',
    height: '100%',
    position: 'relative',
  },

  searchText: {
    fontSize: 14,
    color: colors.figmaBlack,
    width: '100%',
    marginBottom: 5,
  },

  container: {
    flex: 1,
    backgroundColor: colors.figmaWhite,
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
    borderColor: colors.figmaGreen500,
    backgroundColor: colors.figmaGreen500,
    height: 45,
    borderTopRightRadius: 7,
    borderTopLeftRadius: 7,
    width: '100%',
    flexDirection: 'column',
    paddingHorizontal: 'auto',
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
    borderColor: colors.figmaGray600,
    borderRadius: 5,
    paddingHorizontal: 10,

  },

  scrapperButtonText: {
    color: colors.figmaWhite,
    fontSize: 16,
  },

  scrapperButton: {
    backgroundColor: colors.figmaGreen500,
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
    borderBottomColor: colors.figmaGray400,
    borderBottomWidth: 1,
    paddingLeft: '7%',
  },

  even: {
    backgroundColor: colors.figmaWhite,
  },

  odd: {
    backgroundColor: colors.figmaWhite,
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
    color: colors.figmaGray600,
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
    color: colors.figmaYellow500,
    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  measure: {
    fontSize: 12,
    color: colors.figmaGray400,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'right',
  },
});

export default styles;
