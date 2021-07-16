import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.kitchengramWhite,
    paddingTop: 5,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  mainDataView: {
    display: 'flex',
    width: '100%',
    paddingHorizontal: '2.5%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitle: {
    fontSize: 14,
    color: colors.kitchengramBlack,
    marginTop: 5,
  },
  textInput: {
    width: '100%',
    height: 50,
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: colors.kitchengramGray600,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 5,
  },
  selectRecipesRow: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
  },
  centerView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  totalMenuRow: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.kitchengramBlack,
    color: colors.kitchengramWhite,
    padding: 15,
    justifyContent: 'space-between',
  },
  totalPriceText: {
    color: colors.kitchengramWhite,
  },
  totalPriceNumber: {
    color: colors.kitchengramWhite,
    fontWeight: 'bold',
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
  twoButtonContainer: {
    width: '48%',
  },
  button: {
    height: 36,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingHorizontal: 5,
  },
  lineButton: {
    alignSelf: 'stretch',
    height: 36,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    backgroundColor: colors.kitchengramGreen500,
    borderColor: colors.kitchengramGreen500,
  },
  searchButton: {
    borderColor: colors.kitchengramYellow500,
    borderWidth: 2,
  },
  actionText: {
    color: colors.kitchengramWhite,
  },
  searchText: {
    color: colors.yellow,
    fontSize: 16,
    padding: 10,
  },
  recipeRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: '5%',
    marginHorizontal: '3%',
    paddingVertical: 15,
    // borderEndWidth: 2,
    borderBottomWidth: 1,
    borderColor: colors.kitchengramGray400,

  },
  recipeMoreAndLessRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  recipeCheckAndQtyRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  recipeMoreAndLessButton: {
    width: 34,
    height: 34,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.kitchengramGray400,
    margin: 2,
  },
  moreAndLessButtonText: {
    color: colors.kitchengramWhite,
    fontSize: 20,
  },
  moreAndLessNumberArea: {
    width: 50,
    height: 34,
    borderColor: colors.kitchengramGray600,
    borderWidth: 1.5,
    borderRadius: 5,
    color: colors.kitchengramGray600,
    fontSize: 16,
    textAlign: 'center',
    margin: 2,
  },
  nameandQtyColumn: {
    display: 'flex',
  },
  recipeNameText: {
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 4,
  },
  priceAndRemoveRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  recipePriceText: {
    color: colors.kitchengramYellow500,
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
});

export default styles;
