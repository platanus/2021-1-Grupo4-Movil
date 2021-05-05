import { StyleSheet } from 'react-native';
import colors from './appColors';

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10 },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: '30%',
  },

  errorMessage: {
    textAlign: 'center',
    color: colors.red },

  haveAccountText: {
    textAlign: 'center',
    color: colors.blue,
    marginTop: '4%' },

  helloText: {
    marginTop: 0,
    fontSize: 24,
    color: colors.blue,
    fontWeight: 'bold',
    marginBottom: '20%',

  },
  input: {
    height: 40,
    margin: 5,
    borderWidth: 2,
    borderColor: colors.blue,
    maxWidth: '100%',
    marginLeft: 3,
    borderRadius: 5,
    paddingHorizontal: 10,

  },
  logContainer: {
    width: '70%',
    backgroundColor: colors.white,
    // alignItems: 'center',
    // justifyContent: 'flex-start',
  },
  loginText: {
    fontSize: 18,
    color: colors.blue,
  },

});

export default styles;
