import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import colors from '../appColors';

const styles = StyleSheet.create({

  mainContainer: {
    backgroundColor: colors.white,
  },
  recipeInfoRow: {
    alignItems: 'center',
    padding: 5,
    width: '63%',
    backgroundColor: colors.white,
  },
  inlineInputs: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 5,
    width: '80%',
    alignItems: 'flex-start',
  },
  sectionTitleText: {
    marginLeft: '5%',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTextInput: {
    width: '100%',
    height: 40,
    margin: 5,
    borderWidth: 2,
    borderColor: colors.tableBorder,
    maxWidth: '100%',
    marginLeft: 3,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  sectionQuantityInput: {
    bottom: '60%',
    display: 'flex',
    width: '30%',
    height: 40,
    margin: 5,
    borderWidth: 2,
    backgroundColor: colors.white,
    borderColor: colors.tableBorder,
    maxWidth: '100%',
    marginLeft: 3,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  totalCost: {
    bottom: '60%',
    display: 'flex',
    width: '30%',
    height: 40,
    margin: 5,
    borderWidth: 2,
    backgroundColor: colors.white,
    borderColor: colors.tableBorder,
    maxWidth: '100%',
    marginLeft: 3,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  sectionQuantity: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    margin: 5,
    width: '70%',
  },
  sectionPrice: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    margin: 5,
    width: '30%',
  },
  sectionTotalCost: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: '',
    position: 'relative',
    margin: 5,
    width: '90%',
  },
  sectionTotalPrice: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'relative',
    margin: 5,
    width: '10%',
  },
  sectionNameInput: {
    width: '100%',
    height: 40,
    margin: 5,
    borderWidth: 2,
    borderColor: colors.tableBorder,
    maxWidth: '100%',
    marginLeft: 3,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  label: {
    alignContent: 'flex-start',
    fontSize: 12,
    borderColor: colors.tableBorder,
  },
  ingredientButton: {
    width: '120%',
    height: 40,
    margin: 5,
    maxWidth: '100%',
    marginLeft: 3,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    pading: 5,
    marginLeft: '5%',
    marginTop: '5%',
    width: '90%',
    //borderWidth: 3,
    //borderColor: 'black',
  },
  recipeInfoContainer: {
    marginLeft: '7%',
    marginTop: 10,
  },
  infoText: {
    color: 'black',
    fontSize: 18,
    marginLeft: 10,
  },
  ingredientsContainer: {
    paddingTop: 10,
  },
  ingredientsList: {
    margin: 10,
    backgroundColor: colors.ingredientsList,
    alignItems: 'center',
  },
  ingredientTextBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  totalCostTextBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  ingredientText: {
    fontSize: 16,
  },

  stepBox: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 10,
  },

  stepText: {
    color: colors.ingredientsTitle,
    fontSize: 14,
    textAlign: 'justify',
    width: '80%',
  },
  stepNumber: {
    color: colors.ingredientsTitle,
    fontSize: 18,
    textAlign: 'center',
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.ingredientsList,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  newStepText: {
    margin: '7%',
    height: 60,
    borderColor: colors.tableBorder,
    borderRadius: 5,
    borderWidth: 2,
  },
  stepButton: {
    width: '30%',
    height: 40,
    margin: 5,
    maxWidth: '100%',
    marginLeft: 3,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.blue,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  sectionNewStep: {
    bottom: '5%',
    left: '61%',
  },
  submitNewRecipe: {
    width: '100%',
    height: 40,
    margin: 5,
    bottom: '50%',
    maxWidth: '100%',
    marginLeft: 3,
    marginTop: 10,
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
  newRecipeButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default styles;
