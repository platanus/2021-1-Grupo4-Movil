import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
  },
  recipeInfoRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
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
  sectionTitleText: {
    marginLeft: '5%',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  ingredientsContainer: {
    paddingTop: 10,
  },
  ingredientsList: {
    marginTop: 10,
    backgroundColor: colors.ingredientsList,
    paddingBottom: 20,
  },
  ingredientTextBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 20,
    marginHorizontal: '5%',
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
});

export default styles;
