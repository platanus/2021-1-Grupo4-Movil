import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  inputContainer: {
    width: '75%',
    height: '10%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 22,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: colors.tableBorder,
    marginBottom: 3,
  },

  input: {
    width: '100%',
    height: '85%',
    borderColor: colors.tableBorder,
    borderWidth: 2,
    borderRadius: 5,
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: '#111111',
  },

  dropDown: {
    width: '100%',
    height: '85%',
    borderColor: colors.tableBorder,
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
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scrapperButton: {
    backgroundColor: colors.greenButtons,
    padding: 12,
    borderRadius: 5,
    height: '8%',
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10 },

  scrapperButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },

  cancel: {
    width: '30%',
    backgroundColor: 'transparent',
    marginRight: 10,
  },

  confirm: {
    width: '55%',
    backgroundColor: colors.greenButtons,
    borderRadius: 5,
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
    color: colors.white,
  },
});

export default styles;
