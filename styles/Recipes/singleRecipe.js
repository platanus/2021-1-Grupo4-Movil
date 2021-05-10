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
    fontSize: 16,
  },
  sectionTitleText: {
    marginLeft: '7%',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ingredientsContainer: {
    paddingTop: 10,
  },
  ingredientsList: {
    marginTop: 10,
    backgroundColor: colors.tableBorder,
    padding: 10,
  },
  ingredientText: {
    marginTop: 5,
    marginBottom: 5,
  },

  stepBox: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 40,
  },

  stepText: {
    color: colors.ingredientsTitle,
  },

});

export default styles;
