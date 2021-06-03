import { StyleSheet } from 'react-native';
import colors from './appColors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 15,
    flex: 1,
  },

  attributeContainer: {
    width: '80%',
    height: '10%',
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  name: {
    width: '50%',
    textAlign: 'left',
    fontSize: 15,
    color: '#767676',

    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  value: {
    width: '50%',
    textAlign: 'right',
    fontSize: 17,
    color: '#111111',

    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  buttonsContainer: {
    width: '100%',
    height: '15%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  delete: {
    width: '40%',
    height: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: colors.greenButtons,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  deleteText: {
    color: colors.greenButtons,

    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 16,
  },

  edit: {
    width: '40%',
    height: '30%',
    backgroundColor: colors.greenButtons,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  editText: {
    color: '#FFFFFF',

    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 16,
  },
});

export default styles;
