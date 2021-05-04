import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: '30%',
  },

  loginText: {
    fontSize: 18,
    color: '#E5E5E5',
  },

  logContainer: {
    width: '90%',
    backgroundColor: '#fff',
  },

  input: {
    height: 60,
    margin: 5,
    borderWidth: 5,
    borderColor: '#E5E5E5',
    maxWidth: '100%',
    marginLeft: 3,
    borderRadius: 5,
    paddingHorizontal: 10,

  },

  buttonText1: {
    color: 'white',
    fontWeight: 'bold',
  },

  button1: {
    backgroundColor: '#074eec',
    padding: 5,
    borderRadius: 50,
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 250,
  },

  buttonText2: {
    color: '#074eec',
    fontWeight: 'bold',
  },

  button2: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 50,
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 250,
  },

  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
