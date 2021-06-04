import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
    height: '100%',
  },
  container: {
    backgroundColor: colors.white,
    display: 'flex',
    flex: 1,
  },
  ingredientsContainer: {
    backgroundColor: colors.white,
    display: 'flex',
    height: '80%',
  },
  recipeSearcherRow: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 5,
    width: '100%',
    backgroundColor: colors.white,
  },
  label: {
    alignContent: 'flex-start',
    fontSize: 12,
    borderColor: colors.tableBorder,
  },
  searcherInput: {
    width: '100%',
    height: 50,
    margin: 5,
    borderWidth: 2,
    borderColor: colors.tableBorder,
    maxWidth: '100%',
    marginLeft: 3,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  ingredientRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  ingredientData: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 4,
    width: '20%',
  },
  checkbox: {
    flexDirection: 'row',
    marginRight: 10,
  },
  name: {
    fontSize: 17,
    color: colors.darkGray,
    paddingBottom: '5%',
  },
  ingredientPrice: {
    display: 'flex',
    flexDirection: 'row',
    left: '55%',
  },
  price: {
    fontSize: 20,
    color: colors.purple,
  },
  submitIngredients: {
    width: '100%',
    height: 40,
    margin: 5,
    maxWidth: '95%',
    marginLeft: '2.5%',
    marginTop: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.blue,
    padding: 12,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.blue,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  saveButton: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
