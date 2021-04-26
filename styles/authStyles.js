import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    button: { 
    backgroundColor: "#074eec",
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center', 
    marginTop: 10,},
  
    buttonText: { 
    color: 'white',
    fontWeight: 'bold',
    },
  
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      // justifyContent: 'center',
      paddingTop: "30%",
    },

    errorMessage: {
        textAlign: "center",
        color:"red"},

    helloText:{
      marginTop: 0,
      fontSize: 24,
      color: "#074eec",
      fontWeight: "bold",
      marginBottom: "20%",
  
    },
    input:{
      height: 40,
      margin: 5,
      borderWidth: 2,
      borderColor: "#074eec",
      maxWidth: "100%",
      marginLeft: 3,
      borderRadius: 5,
      paddingHorizontal:10,
      
    },
    logContainer: {
      width: "70%",
      backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'flex-start',
    },
    loginText:{
      fontSize: 18,
      color: "#074eec",
    },
   
  });

export default styles;