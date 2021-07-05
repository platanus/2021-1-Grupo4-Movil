import {
    Alert,
  } from 'react-native';
import Clipboard from 'expo-clipboard';

const formatListForClipboard = (shoppingList) => {
    return 'Esto se pego desde expo'
  }
  
  const copyList = (providers) => {
    const listString = formatListForClipboard(providers)
  
    console.log(listString)
    Clipboard.setString(listString)
  
    Alert.alert('¡Los datos han sido copiados con éxito!', '',
      [{ text: 'Ok', style: 'default' }],
    );
  }
  

export default copyList;
