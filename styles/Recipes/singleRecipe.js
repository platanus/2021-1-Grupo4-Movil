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
    marginBottom: 10,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  ingredientsContainer: {
    paddingTop: 25,
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
  menuContainer: {
    // position: 'absolute',
    // zIndex: 1,

    // backgroundColor: colors.white,
    // width: '100%',
  },
  menuOption: {
    // zIndex: 1,
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: '5%',
    borderBottomWidth: 0.3,
    borderColor: colors.tableBorder,
    // borderRadius: 5,
  },
  moreVert: {
    paddingRight: 8,
  },
});

export default styles;
