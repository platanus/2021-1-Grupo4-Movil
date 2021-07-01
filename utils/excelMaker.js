import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const formatListForExcel = (shoppingList) => {
  shoppingList.forEach((provider) => {
    provider.ingredients.forEach((ingredient) => {
      ingredient.total = Number(ingredient.quantity) * Number(ingredient.totalPrice)
    })
  })
  return shoppingList;
}


const exportExcel = async (providers) => {

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

const formattedProviders = formatListForExcel(providers)

const wb = XLSX.utils.book_new();

formattedProviders.forEach((provider) => {
  const ws = XLSX.utils.json_to_sheet(provider.ingredients);
  XLSX.utils.book_append_sheet(wb, ws, provider.provider);
})

const wbout = XLSX.write(wb, {
  type: 'base64',
  bookType: "xlsx"
});

const uri = FileSystem.cacheDirectory + 'lista_de_compras.xlsx';

await FileSystem.writeAsStringAsync(uri, wbout, {
  encoding: FileSystem.EncodingType.Base64
});

await Sharing.shareAsync(uri, {
  mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  dialogTitle: 'shopping_list data',
  UTI: 'com.microsoft.excel.xlsx'
});
}

export default exportExcel;
