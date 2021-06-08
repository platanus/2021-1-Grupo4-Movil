import { StyleSheet } from 'react-native';
import colors from './appColors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.figmaWhite,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 15,
    flex: 1,
    paddingHorizontal: '5%',
  },

  attributeContainer: {
    height: '12%',
    borderBottomColor: colors.figmaGray400,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  name: {
    width: '40%',
    textAlign: 'left',
    fontSize: 14,
    color: colors.figmaGray600,
    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  value: {
    width: '60%',
    textAlign: 'right',
    fontSize: 20,
    color: colors.figmaGray600,
    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  buttonsContainer: {
    width: '100%',
    height: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    marginHorizontal: '5%',
    paddingVertical: '5%',
  },

  delete: {
    width: '48%',
    height: '100%',
    backgroundColor: colors.figmaRed500,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteText: {
    color: colors.figmaWhite,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 16,
  },

  edit: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    height: '100%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.figmaGray600,
  },

  editText: {
    color: colors.figmaGray600,

    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 16,
  },
});

export default styles;
