import { StyleSheet } from 'react-native';
import colors from '../appColors';

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 15,
    flex: 1,
  },

  modalAttributeContainer: {
    width: '80%',
    height: '10%',
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalName: {
    width: '50%',
    textAlign: 'left',
    fontSize: 15,
    color: '#767676',

    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  modalValue: {
    width: '50%',
    textAlign: 'right',
    fontSize: 17,
    color: '#111111',

    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  modalButtonsContainer: {
    width: '100%',
    height: '15%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalDelete: {
    width: '40%',
    height: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: colors.greenButtons,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  modalDeleteText: {
    color: colors.greenButtons,

    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 16,
  },

  modalEdit: {
    width: '40%',
    height: '30%',
    backgroundColor: colors.greenButtons,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalEditText: {
    color: '#FFFFFF',

    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 16,
  },
});

export default styles;
