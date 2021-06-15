import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.kitchengramWhite,
    flex: 1,
  },
  menuRow: {
    flex: 1.5,
    paddingTop: 20,
    paddingBottom: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: colors.kitchengramWhite,
    borderBottomColor: colors.kitchengramGray600,
    borderBottomWidth: 1,
    paddingLeft: '5%',
    paddingRight: '3%',
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
    width: '35%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  price: {
    fontSize: 24,
    color: colors.kitchengramYellow500,
  },
  name: {
    fontSize: 20,
    color: colors.kitchengramGray600,
  },
  menuInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  subtitle: {
    fontSize: 14,
    color: colors.kitchengramGray400,
    paddingLeft: 5,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: colors.grayName,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  navIcon: {
    paddingRight: 8,
    color: colors.black,
  },

  emptyMessage: {
    color: colors.kitchengramGray600,
    textAlign: 'center',
    paddingTop: 15,
    fontSize: 16,
  },
});

export default styles;
