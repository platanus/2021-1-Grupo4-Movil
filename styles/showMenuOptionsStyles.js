import { StyleSheet } from 'react-native';
import colors from './appColors';

const styles = StyleSheet.create({
  menuOption: {
    // zIndex: 1,
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: '5%',
    borderBottomWidth: 0.3,
    borderColor: colors.tableBorder,
    // borderRadius: 5,
  },
  menuText: {
    fontSize: 16,
  },
  moreVert: {
    paddingRight: 8,
    color: colors.recipeIcon,
  },
});

export default styles;
