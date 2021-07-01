import XLSX from 'xlsx';
import { cacheDirectory, writeAsStringAsync, EncodingType } from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

const formatListForExcel = (shoppingList) => {
  shoppingList.forEach((provider) => {
    provider.ingredients.forEach((ingredient) => {
      ingredient.total = Number(ingredient.quantity) * Number(ingredient.totalPrice);
    });
  });

  return shoppingList;
};

const exportExcel = async (providers) => {
  // ESTO ES PARA DEBUGGEAR
  // const providers = [
  //     {
  //       "ingredients": [
  //         {
  //           "measure": "Un",
  //           "name": "Clorox - Cloro tradicional",
  //           "quantity": 4,
  //           "totalPrice": 1599,
  //         },
  //         {
  //           "measure": "Un",
  //           "name": "Ford",
  //           "quantity": 1,
  //           "totalPrice": 1599,
  //         },
  //       ],
  //       "provider": "Sin proveedor",
  //     },
  //     {
  //       "ingredients": [
  //         {
  //           "measure": "Gr",
  //           "name": "Palto",
  //           "quantity": 2,
  //           "totalPrice": 1600,
  //         },
  //         {
  //           "measure": "Gr",
  //           "name": "Zanahorias",
  //           "quantity": 60,
  //           "totalPrice": 500,
  //         },
  //       ],
  //       "provider": "Jumbo",
  //     },
  //   ]

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
};

export default exportExcel;
