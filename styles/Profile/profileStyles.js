import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({

  container: {
    backgroundColor: colors.kitchengramWhite,
    minHeight: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '20%',
    flex: 1,
    paddingHorizontal: '5%',
  },

  profileTitle: {
    color: colors.kitchengramGray800,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 5,
  },

  changePasswordContainer: {
    height: 400,
    width: '100%',
    justifyContent: 'flex-start',
    paddingHorizontal: '5%',
  },

  sectionTitle: {
    color: colors.kitchengramBlack,
    fontSize: 18,
    marginVertical: 15,
    paddingLeft: 5,
  },

  loginText: {
    paddingLeft: 5,
    marginTop: 5,
    fontSize: 18,
    color: colors.kitchengramGray600,
  },

  input: {
    height: 50,
    margin: 5,
    borderWidth: 2,
    borderColor: colors.kitchengramGray600,
    maxWidth: '100%',
    marginLeft: 3,
    borderRadius: 5,
    paddingHorizontal: 10,
  },

  eye: {
    position: 'absolute',
    top: '30%',
    right: '5%',
  },

  buttonsContainer: {
    width: '100%',
    height: 100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },

  sessionButton: {
    backgroundColor: colors.kitchengramGray800,
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  saveButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

  saveButton: {
    backgroundColor: colors.kitchengramGreen500,
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  buttonsText: {
    color: colors.kitchengramWhite,
    fontSize: 16,
  },

});

export default styles;
