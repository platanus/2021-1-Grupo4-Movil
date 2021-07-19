import { StyleSheet } from 'react-native';
import colors from './appColors';

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.kitchengramGreen500,
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: colors.kitchengramWhite,
    fontWeight: 'bold',
  },

  chefIcon: {
    width: 65,
    height: 65,
  },

  container: {
    flex: 1,
    backgroundColor: colors.kitchengramWhite,
    alignItems: 'center',
    paddingTop: '20%',
  },

  descriptionText: {
    position: 'absolute',
    paddingTop: 40,
    color: colors.kitchengramGray800,
    fontSize: 15,
  },

  errorMessage: {
    textAlign: 'center',
    color: colors.kitchengramYellow500,
  },

  infoMessage: {
    paddingTop: '5%',
    color: colors.kitchengramGray400,
  },

  eye: {
    position: 'absolute',
    top: '30%',
    right: '5%',
  },

  haveAccountText: {
    textAlign: 'center',
    color: colors.kitchengramGray600,
    marginTop: '6%',
  },

  helloText: {
    marginTop: 5,
    fontSize: 24,
    color: colors.kitchengramGray800,
    fontWeight: 'bold',
    marginBottom: '13%',
  },

  forgotPasswordText: {
    textAlign: 'center',
    color: colors.yellow,
    marginTop: '8%',
  },

  helloContainer: {
    alignItems: 'center',
  },

  input: {
    height: 40,
    margin: 5,
    borderWidth: 2,
    borderColor: colors.kitchengramGray600,
    maxWidth: '100%',
    marginLeft: 3,
    borderRadius: 5,
    paddingHorizontal: 10,
  },

  logContainer: {
    width: '70%',
    backgroundColor: colors.kitchengramWhite,
  },
  loginText: {
    paddingLeft: 5,
    fontSize: 18,
    color: colors.tableBorder,
  },

});

export default styles;
