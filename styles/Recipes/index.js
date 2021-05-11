import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    width: '40%',
    height: '100%',
    paddingRight: '5%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  name: {
    fontSize: 17,
    color: '#111111',
    paddingBottom: '5%',
  },
  recipeRow: {
    width: '100%',
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  even: {
    backgroundColor: '#EEEEEE',
  },
  price: {
    fontSize: 20,
    color: '#BC31EA',
  },
  subtitle: {
    fontSize: 15,
    color: '#767676',
  },
  recipeInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default styles;
