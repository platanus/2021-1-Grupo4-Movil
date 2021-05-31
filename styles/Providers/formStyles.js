import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingTop: 15,
  },

  inputContainer: {
    width: '80%',
    height: '10%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 20,
  },

  inputLabel: {
    fontSize: 14,
    height: '20%',

    fontWeight: 'normal',
    fontStyle: 'normal',
    color: '#767676',
    marginBottom: 5,
  },

  input: {
    width: '100%',
    height: '60%',
    borderColor: '#AAAAAA',
    borderWidth: 2,
    borderRadius: 5,
    fontSize: 16,
    paddingLeft: 15,
    paddingRight: 15,

    fontWeight: '800',
    fontStyle: 'normal',
    color: '#111111',
  },

  dropDown: {
    width: '100%',
    height: '60%',
    borderColor: '#AAAAAA',
    borderWidth: 2,
    borderRadius: 5,
    fontSize: 16,
  },

  buttonsContainer: {
    width: '100%',
    height: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },

  button: {
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancel: {
    width: '30%',
    backgroundColor: 'transparent',
    marginRight: 10,
  },

  confirm: {
    width: '60%',
    backgroundColor: colors.greenButtons,
    borderRadius: 10,
  },

  buttonText: {
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 16,
  },

  cancelText: {
    color: colors.greenButtons,
  },

  confirmText: {
    color: '#FFFFFF',
  },
});

export default styles;
