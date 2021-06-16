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
    marginTop: 10 },

  buttonText: {
    color: colors.kitchengramWhite,
  },

  container: {
    flex: 1,
    backgroundColor: colors.kitchengramWhite,
    alignItems: 'center',
    paddingTop: '30%',
  },

  errorMessage: {
    textAlign: 'center',
    color: colors.kitchengramYellow500,
  },

  eye: {
    position: 'absolute',
    top: '30%',
    right: '5%',
  },

  haveAccountText: {
    textAlign: 'center',
    color: colors.kitchengramGray600,
    marginTop: '4%' },

  helloText: {
    marginTop: 0,
    fontSize: 24,
    color: colors.kitchengramBlack,
    fontWeight: 'bold',
    marginBottom: '20%',

  },
  input: {
    height: 40,
    margin: 5,
    borderWidth: 2,
    borderColor: colors.kitchengramGray600,
    width: '100%',
    marginLeft: 3,
    borderRadius: 5,
    paddingHorizontal: 10,

  },
  logContainer: {
    width: '70%',
    backgroundColor: colors.kitchengramWhite,
    // alignItems: 'center',
    // justifyContent: 'flex-start',
  },
  loginText: {
    fontSize: 18,
    color: colors.kitchengramGray600,
  },

});

export default styles;
