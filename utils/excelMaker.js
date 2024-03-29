import XLSX from 'xlsx';
import { cacheDirectory, writeAsStringAsync, EncodingType } from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

function formatListForExcel(shoppingList) {
  shoppingList.forEach((provider) => {
    provider.ingredients.forEach((ingredient) => {
      ingredient.totalPrice = Math.ceil(Number(ingredient.totalPrice));
    });
  });

  return shoppingList;
}

async function exportExcel(providers) {
  const formattedProviders = formatListForExcel(providers);

  const wb = XLSX.utils.book_new();

  formattedProviders.forEach((provider) => {
    const ws = XLSX.utils.json_to_sheet(provider.ingredients);
    XLSX.utils.book_append_sheet(wb, ws, provider.provider);
  });

  const wbout = XLSX.write(wb, {
    type: 'base64',
    bookType: 'xlsx',
  });

  const uri = `${cacheDirectory}lista_de_compras.xlsx`;

  await writeAsStringAsync(uri, wbout, {
    encoding: EncodingType.Base64,
  });

  await shareAsync(uri, {
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    dialogTitle: 'shopping_list data',
    UTI: 'com.microsoft.excel.xlsx',
  });
}

export default exportExcel;
