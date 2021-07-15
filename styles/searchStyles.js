import { StyleSheet } from 'react-native';
import colors from './appColors';

const styles = StyleSheet.create({
  searchRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  searchIcon: {
    position: 'absolute',
    marginTop: 22,
    marginLeft: 18,
  },
  searchInput: {
    width: '95%',
    marginLeft: '2.5%',
    height: 40,
    fontSize: 18,
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: colors.tableBorder,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 5,
    paddingLeft: 40,
  },
});

export default styles;
