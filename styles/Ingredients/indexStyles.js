import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: '30%',
  },

  button: {
    backgroundColor: '#074eec',
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

  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
