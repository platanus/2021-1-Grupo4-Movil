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
    marginLeft: '5%',
    marginTop: 10,
  },
  infoText: {
    color: 'black',
    fontSize: 18,
    marginLeft: 5,
  },
  sectionTitleText: {
    marginLeft: '5%',
    marginBottom: 15,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  ingredientsContainer: {
    paddingTop: 20,
    paddingBottom: 15,
  },
  ingredientsList: {
    borderBottomWidth: 1,
    borderBottomColor: colors.figmaGray400,
    marginHorizontal: '5%',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  ingredientTextBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ingredientTextLeft: {
    fontSize: 16,
    color: colors.figmaGray600,
    width: '60%',
    textAlign: 'left',
  },

  ingredientTextRight: {
    fontSize: 18,
    color: colors.figmaYellow500,
    width: '40%',
    textAlign: 'right',

  },

  stepBox: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 10,
  },

  stepText: {
    color: colors.figmaBlack,
    fontSize: 14,
    textAlign: 'justify',
    width: '80%',
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
    marginLeft: '3%',
    marginRight: '5%',
  },

  menuOption: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    width: '90%',
    borderWidth: 1,
    marginLeft: '5%',
    marginTop: 10,
    borderRadius: 5,

  },

  edit: {
    color: colors.figmaGray600,
    borderColor: colors.figmaGray600,
  },

  delete: {
    color: colors.figmaRed500,
    borderColor: colors.figmaRed500,
  },

  moreVert: {
    paddingRight: 8,
  },
});

export default styles;
