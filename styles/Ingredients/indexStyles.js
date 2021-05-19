import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },

  ingredientRow: {
    width: '100%',
    height: 90,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  even: {
    backgroundColor: '#EEEEEE',
  },

  odd: {
    backgroundColor: '#FFFFFF',
  },

  left: {
    width: '60%',
    height: '100%',
    paddingLeft: '5%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  name: {
    fontSize: 17,
    color: '#111111',

    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  measure: {
    fontSize: 15,
    color: '#767676',

    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  right: {
    width: '40%',
    height: '100%',
    paddingRight: '5%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  price: {
    fontSize: 18,
    color: '#BC31EA',

    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  addButton: {
    backgroundColor: colors.greenButtons,
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
});

export default styles;
