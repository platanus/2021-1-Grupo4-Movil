import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },

  text: {
    fontSize: 20,
    color: colors.kitchengramBlack,
    fontWeight: '500',
    fontStyle: 'normal',
  },
});

export default styles;
