import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({

  mainContainer: {
    backgroundColor: colors.kitchengramWhite,
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
    borderColor: colors.kitchengramGray600,
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
    backgroundColor: colors.kitchengramWhite,
    borderColor: colors.kitchengramGray600,
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
    backgroundColor: colors.kitchengramWhite,
    borderColor: colors.kitchengramGray600,
    maxWidth: '100%',
    marginLeft: 3,
    paddingHorizontal: 10,
  },
  sectionQuantity: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '65%',
  },
  sectionPrice: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: '30%',
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
    borderColor: colors.kitchengramGray600,
    maxWidth: '100%',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  label: {
    alignContent: 'flex-start',
    fontSize: 14,
    borderColor: colors.kitchengramGray600,
    marginBottom: 5,
  },
  ingredientButton: {
    width: '100%',
    height: 40,
    marginVertical: 5,
    maxWidth: '100%',
    backgroundColor: colors.kitchengramWhite,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.kitchengramYellow500,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ingredientButtonText: {
    color: colors.kitchengramYellow500,
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
    borderBottomColor: colors.kitchengramGray400,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  ingredientTextBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalCostTextBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ingredientText: {
    fontSize: 16,
  },

  ingredientPriceText: {
    fontSize: 18,
    color: colors.kitchengramYellow500,
    width: '75%',
    marginRight: 2,
  },

  totalCostText: {
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 15,
  },

  totalCostPrice: {
    fontSize: 24,
    color: colors.kitchengramYellow500,
    fontWeight: 'bold',
    paddingTop: 15,
  },

  containerWithBorder: {
    borderBottomColor: colors.kitchengramGray400,
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
    color: colors.kitchengramBlack,
    fontSize: 14,
    textAlign: 'justify',
    width: '78%',
    marginRight: 5,
  },
  stepNumber: {
    color: colors.kitchengramWhite,
    fontSize: 18,
    textAlign: 'center',
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.kitchengramYellow500,
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
    color: colors.kitchengramGray600,
    borderColor: colors.kitchengramGray600,
  },

  stepDelete: {
    color: colors.kitchengramRed500,
    borderColor: colors.kitchengramRed500,
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
    backgroundColor: colors.kitchengramWhite,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.kitchengramGreen500,
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
    backgroundColor: colors.kitchengramWhite,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },

  cancelButtonText: {
    color: colors.kitchengramRed500,
    fontSize: 16,

  },
  editButtonText: {
    color: colors.kitchengramGreen500,
    fontSize: 16,
  },
  sectionEditStepButtons: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  newStepText: {
    marginTop: '5%',
    height: 60,
    borderColor: colors.kitchengramGray600,
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
    backgroundColor: colors.kitchengramWhite,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.kitchengramYellow500,
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
    backgroundColor: colors.kitchengramGreen500,
    borderRadius: 5,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  newRecipeButtonText: {
    color: colors.kitchengramWhite,
    fontSize: 16,
  },
});

export default styles;
