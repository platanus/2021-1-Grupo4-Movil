import {
  Alert,
} from 'react-native';
import Clipboard from 'expo-clipboard';

const formatListForClipboard = (shoppingList) => {
  let shoppingListString = '';

  shoppingList.forEach((provider) => {
    shoppingListString += `Compras en *${provider.provider}*:\n\n`;

    let totalPrice = 0;
    provider.ingredients.forEach((ingredient) => {
      const totalPriceIngredient = Number(ingredient.quantity) * Number(ingredient.totalPrice);
      totalPrice += totalPriceIngredient;
      shoppingListString += `${ingredient.name} (${ingredient.quantity}): $${totalPriceIngredient}\n`;
    });
    shoppingListString += `*Precio total: $${totalPrice}*\n\n`;
  });

  return shoppingListString;
};

const copyList = (providers) => {
  const listString = formatListForClipboard(providers);

  Clipboard.setString(listString);

  Alert.alert('¡Los datos han sido copiados con éxito!', '',
    [{ text: 'Ok', style: 'default' }],
  );
};

export default copyList;
