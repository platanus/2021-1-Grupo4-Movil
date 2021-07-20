import {
  Alert,
} from 'react-native';
import Clipboard from 'expo-clipboard';

function formatListForClipboard(shoppingList) {
  let shoppingListString = '';

  shoppingList.forEach((provider) => {
    shoppingListString += `Compras en *${provider.provider}*:\n\n`;

    let totalPrice = 0;
    provider.ingredients.forEach((ingredient) => {
      const totalPriceIngredient = Number(ingredient.quantity) * Number(ingredient.totalPrice);
      totalPrice += totalPriceIngredient;
      shoppingListString += `${ingredient.name} (${ingredient.quantity} ${
        ingredient.measure
      }}): $${totalPriceIngredient}\n`;
    });
    shoppingListString += `*Precio total: $${totalPrice}*\n\n`;
  });

  return shoppingListString;
}

function copyList(providers) {
  const listString = formatListForClipboard(providers);

  Clipboard.setString(listString);

  Alert.alert('¡Los datos han sido copiados con éxito!', '',
    [{ text: 'Ok', style: 'default' }],
  );
}

export default copyList;
