import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({

    container: {
        backgroundColor: colors.white,
    },
    recipeSearcherRow: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: 5,
        width: '100%',
        backgroundColor: colors.white,
    },
    label: {
        alignContent: 'flex-start',
        fontSize: 12,
        borderColor: colors.tableBorder,
    },
    searcherInput: {
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
    ingredientRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    ingredientData: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: '4px',
        width: '20%',
    },
    checkbox: {
        flexDirection: 'row',
        marginRight: '10px',
    },
    name: {
        fontSize: 17,
        color: colors.darkGray,
        paddingBottom: '5%',
    },
    ingredientPrice: {
        display: 'flex',
        flexDirection: 'row',
        left: '55%',
    },
    price: {
        fontSize: 20,
        color: colors.purple,
      },
    submitIngredients: {
        width: '100%',
        height: 40,
        margin: 5,
        bottom: '50%',
        maxWidth: '100%',
        marginLeft: 3,
        marginTop: 50,
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
    saveButton: {
        color: 'white',
        fontWeight: 'bold',
    }
});

export default styles;
