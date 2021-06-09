import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({

  mainContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: '5%',
  },
  recipeInfoRow: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: '100%',

  },

  recipeInfoRowHalf: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    maxWidth: '47%',

  },
  inlineInputs: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  sectionTitleText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTextInput: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderColor: colors.figmaGray600,
    maxWidth: '100%',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  sectionQuantityInput: {
    display: 'flex',
    width: '30%',
    height: 40,
    margin: 5,
    borderWidth: 2,
    backgroundColor: colors.white,
    borderColor: colors.figmaGray600,
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
    borderColor: colors.figmaGray600,
    maxWidth: '100%',
    marginLeft: 3,
    paddingHorizontal: 10,
  },
  sectionQuantity: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    margin: 5,
    width: '65%',
  },
  sectionPrice: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    margin: 5,
    width: '35%',
  },
  sectionTotalCost: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    margin: 5,
    width: '90%',
  },
  sectionTotalPrice: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
    width: '10%',
  },
  sectionNameInput: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderColor: colors.figmaGray600,
    maxWidth: '100%',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  label: {
    alignContent: 'flex-start',
    fontSize: 14,
    borderColor: colors.figmaGray600,
    marginBottom: 5,
  },
  ingredientButton: {
    width: '100%',
    height: 40,
    margin: 5,
    maxWidth: '100%',
    backgroundColor: colors.figmaWhite,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.figmaYellow500,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ingredientButtonText: {
    color: colors.figmaYellow500,
    fontSize: 16,

  },

  container: {
    paddingVertical: 5,
    marginTop: '5%',
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
    width: '100%',
  },
  ingredientsList: {
    borderBottomWidth: 1,
    borderBottomColor: colors.figmaGray400,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  ingredientTextBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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

  ingredientPriceText: {
    fontSize: 18,
    color: colors.figmaYellow500,
    width: '75%',
    marginRight: 2,
  },

  totalCostText: {
    fontSize: 18,
    paddingTop: 10,
  },

  totalCostPrice: {
    fontSize: 24,
    color: colors.figmaYellow500,
    fontWeight: 'bold',
    paddingTop: 15,
  },
 
  containerWithBorder: {
    borderBottomColor: colors.figmaGray400,
    borderBottomWidth: 1,
  },
  stepsContainer: {
    paddingTop: 25,
    width: '100%',
  },
  stepBox: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  stepText: {
    color: colors.ingredientsTitle,
    fontSize: 14,
    textAlign: 'justify',
    width: '78%',
    marginRight: 5,
  },
  stepNumber: {
    color: colors.figmaWhite,
    fontSize: 18,
    textAlign: 'center',
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.figmaYellow500,
    overflow: 'hidden',
    marginHorizontal: 10,
  },

  stepMenuOption: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    width: '90%',
    borderWidth: 1,
    marginLeft: '5%',
    marginTop: 10,
    borderRadius: 5,

  },

  stepEdit: {
    color: colors.figmaGray600,
    borderColor: colors.figmaGray600,
  },

  stepDelete: {
    color: colors.figmaRed500,
    borderColor: colors.figmaRed500,
    marginBottom: 10,
  },

  stepMenuSection: {
    display: 'flex',
  },
  stepEditButton: {
    width: '100%',
    height: 40,
    marginVertical: 5,
    maxWidth: '100%',
    paddingHorizontal: 20,
    backgroundColor: colors.figmaWhite,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.figmaGreen500,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  stepCancelEditButton: {
    width: '100%',
    height: 40,
    marginVertical: 5,
    maxWidth: '100%',
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },

  cancelButtonText: {
    color: colors.figmaRed500,
    fontSize: 16,

  },
  editButtonText: {
    color: colors.figmaGreen500,
    fontSize: 16,
  },
  sectionEditStepButtons: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  newStepText: {
    marginTop: '5%',
    height: 60,
    borderColor: colors.figmaGray600,
    borderRadius: 5,
    borderWidth: 2,
    paddingHorizontal: 10,
  },
  stepButton: {
    height: 40,
    marginTop: 10,
    marginBottom: 20,
    maxWidth: '100%',
    paddingHorizontal: 10,
    backgroundColor: colors.figmaWhite,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.figmaYellow500,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  sectionNewStep: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    backgroundColor: colors.figmaGreen500,
    borderRadius: 5,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  newRecipeButtonText: {
    color: colors.white,
    fontSize: 16,
  },
});

export default styles;
