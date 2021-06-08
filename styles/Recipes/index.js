import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.figmaWhite,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  left: {
    width: '65%',
    height: '100%',
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
    color: colors.figmaGray600,
  },
  recipeRow: {
    flex: 1.5,
    width: '100%',
    height: '20%',
    paddingTop: '5%',
    paddingBottom: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: colors.figmaWhite,
    borderBottomColor: colors.figmaGray600,
    borderBottomWidth: 1,
    paddingLeft: '5%',
    paddingRight: '3%',
  },
  price: {
    fontSize: 24,
    color: colors.figmaYellow500,
  },
  subtitle: {
    fontSize: 14,
    color: colors.figmaGray400,
    paddingLeft: 5,
  },
  recipeInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
});

export default styles;
