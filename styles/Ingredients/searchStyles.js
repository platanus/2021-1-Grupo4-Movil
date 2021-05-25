import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: colors.white,
    width: '100%',
    height: '100%',
  },

  searchText: {
    fontSize: 18,
    color: colors.tableBorder,
  },

  container: {
    flex: 1,
    paddingHorizontal: '12%',
    alignItems: 'flex-start',
    paddingTop: '10%',
  },

  customPickerBox: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: colors.tableBorder,
    height: 40,
    borderRadius: 5,
    minWidth: '100%',
    flexDirection: 'column',
  },

  input: {
    height: 40,
    marginTop: 5,
    borderWidth: 2,
    borderColor: colors.tableBorder,
    width: '100%',
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10 },
});

export default styles;
