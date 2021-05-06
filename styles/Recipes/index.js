import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },

  titleRow: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    backgroundColor: '#BBBBBB',
    paddingLeft: '5%',
  },

  rowTitle: {
    fontSize: 17,
    color: '#111111',
    fontFamily: 'monospace',
    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  scrollView: {
    width: '100%',
    height: '82%',
  },

  ingredientRow: {
    width: '100%',
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  even: {
    backgroundColor: '#EEEEEE',
  },

  odd: {
    backgroundColor: '#FFFFFF',
  },

  left: {
    width: '60%',
    height: '100%',
    paddingLeft: '5%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  name: {
    fontSize: 17,
    color: '#111111',
    fontFamily: 'monospace',
    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  measure: {
    fontSize: 15,
    color: '#767676',
    fontFamily: 'monospace',
    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  right: {
    width: '40%',
    height: '100%',
    paddingRight: '5%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  price: {
    fontSize: 18,
    color: '#BC31EA',
    fontFamily: 'monospace',
    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  addButton: {
    backgroundColor: '#074eec',
    width: 45,
    height: 45,
    borderRadius: 50,
    position: 'absolute',
    right: 25,
    bottom: '10%',
    alignItems: 'center',
  },

  plus: {
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '300',
    color: '#FFFFFF',
  },

  navigation: {
    width: '100%',
    height: '8%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  navigationText: {
    fontSize: 17,
    color: '#111111',
    fontFamily: 'monospace',
    fontWeight: '800',
    fontStyle: 'normal',
  },

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
    fontFamily: 'monospace',
    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  modalValue: {
    width: '50%',
    textAlign: 'right',
    fontSize: 17,
    color: '#111111',
    fontFamily: 'monospace',
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
    borderColor: '#074EE8',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  modalDeleteText: {
    color: '#074EE8',
    fontFamily: 'monospace',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 16,
  },

  modalEdit: {
    width: '40%',
    height: '30%',
    backgroundColor: '#074EE8',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalEditText: {
    color: '#FFFFFF',
    fontFamily: 'monospace',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 16,
  },
});

export default styles;