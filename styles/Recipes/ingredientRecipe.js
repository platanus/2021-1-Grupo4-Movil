import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({

  container: {
    backgroundColor: colors.kitchengramWhite,
    paddingTop: 15,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  scroll: {
    height: '72%',
    marginBottom: 10,
  },
  ingredientsContainer: {
    backgroundColor: colors.kitchengramWhite,
    display: 'flex',
  },
  recipeSearcherRow: {
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
    width: '100%',
    backgroundColor: colors.kitchengramWhite,
  },
  label: {
    alignContent: 'flex-start',
    fontSize: 14,
    color: colors.kitchengramBlack,
    marginBottom: 5,
  },
  searcherInput: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderColor: colors.kitchengramGray600,
    maxWidth: '100%',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  ingredientRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.kitchengramGray400,

  },
  ingredientData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 5,
    width: '65%',
  },
  checkbox: {
    paddingHorizontal: 0,
  },
  name: {
    fontSize: 17,
    color: colors.kitchengramBlack,
    textAlign: 'left',
    width: '73%',
  },
  ingredientPrice: {
    display: 'flex',
    flexDirection: 'row',
  },
  price: {
    fontSize: 15,
    width: 80,
    color: colors.kitchengramYellow500,
  },
  submitIngredients: {
    width: '100%',
    height: 36,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.kitchengramGreen500,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    color: 'white',
    fontSize: 16,
  },
  menuButtonsRow: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 13,
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
  },
  oneButtonContainer: {
    width: '100%',
  },
});

export default styles;
