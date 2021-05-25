import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: colors.white,
    width: '100%',
    height: '100%',
    position: 'relative',
  },

  searchText: {
    fontSize: 18,
    color: colors.tableBorder,
    width: '75%',
  },

  container: {
    flex: 1,
    backgroundColor: colors.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '5%',
    position: 'relative',
  },

  responseContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },

  customPickerBox: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: colors.tableBorder,
    height: 40,
    borderRadius: 5,
    width: '80%',
    flexDirection: 'column',
    marginBottom: 10,
  },

  input: {
    width: '75%',
    height: 40,
    marginTop: 5,
    borderWidth: 2,
    borderColor: colors.tableBorder,
    borderRadius: 5,
    paddingHorizontal: 10,

  },

  scrapperButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },

  scrapperButton: {
    backgroundColor: colors.greenButtons,
    padding: 12,
    borderRadius: 5,
    width: '76%',
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
    justifyContent: 'center',
    position: 'relative',
  },

  even: {
    backgroundColor: '#EEEEEE',
  },

  odd: {
    backgroundColor: colors.white,
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
    width: '70%',
    fontSize: 17,
    color: '#111111',
    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  right: {
    width: '20%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  price: {
    fontSize: 18,
    color: '#BC31EA',
    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  measure: {
    fontSize: 15,
    color: '#767676',
    fontWeight: 'normal',
    fontStyle: 'normal',
  },
});

export default styles;
