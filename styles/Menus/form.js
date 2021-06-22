import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
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
    color: colors.grayName,
    paddingTop: 8,
    fontSize: 16,
    // paddingVertical: 2,
  },
  textInput: {
    width: '100%',
    height: 50,
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: colors.tableBorder,
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
    backgroundColor: colors.black,
    color: colors.white,
    padding: 15,
    justifyContent: 'space-between',
  },
  totalPriceText: {
    color: colors.white,
  },
  totalPriceNumber: {
    color: colors.white,
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
    backgroundColor: colors.greenButtons,
    borderColor: colors.greenButtons,
  },
  searchButton: {
    borderColor: colors.yellow,
    borderWidth: 2,
  },
  actionText: {
    color: colors.white,
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
    borderColor: colors.grayIcon,

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
    backgroundColor: colors.grayIcon,
    margin: 2,
  },
  moreAndLessButtonText: {
    color: colors.white,
    fontSize: 20,
  },
  moreAndLessNumberArea: {
    width: 50,
    height: 34,
    borderColor: colors.tableBorder,
    borderWidth: 1.5,
    borderRadius: 5,
    color: colors.tableBorder,
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
    // paddingTop: 5,
  },
  priceAndRemoveRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  recipePriceText: {
    color: colors.yellow,
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
});

export default styles;
