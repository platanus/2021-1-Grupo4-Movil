import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
  menuRow: {
    flex: 1.5,
    width: '100%',
    height: '20%',
    paddingTop: '5%',
    paddingBottom: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    color: colors.white,
    borderBottomColor: colors.grayName,
    borderBottomWidth: 0.2,
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
  price: {
    fontSize: 20,
    color: colors.yellow,
  },
  name: {
    fontSize: 17,
    color: colors.grayName,
    paddingBottom: '5%',
  },
  menuInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: colors.grayIcon,
    marginLeft: 10,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: colors.grayName,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default styles;
