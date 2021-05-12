import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
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
    fontFamily: 'monospace',
    fontWeight: 'normal',
    fontStyle: 'normal',
    paddingBottom: '5%',
  },
  recipeRow: {
    width: '100%',
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    color: colors.white,
  },
  price: {
    fontSize: 20,
    color: colors.purple,
  },
  subtitle: {
    fontSize: 15,
    color: colors.blue,
    fontFamily: 'monospace',
    fontWeight: 'normal',
    fontStyle: 'normal',
  },
  recipeInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default styles;
