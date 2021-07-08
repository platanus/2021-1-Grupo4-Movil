import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useStoreActions } from 'easy-peasy';
import styles from '../styles/Recipes/singleRecipe';
import DeleteModal from './DeleteModal';

function ShowMenuOptions(props) {
  const {
    navigation,
    menuVisible,
    element,
    elementsArray = [],
    setElementsArray = null,
    editNavigation,
    indexNavigation,
    deleteApi,
    isRecipe = false,
  } = props;

  const getRecipeAssociations = useStoreActions((actions) => actions.getRecipeAssociations);
  const [showModal, setShowModal] = useState(false);
  const [dependencies, setDependencies] = useState([]);

  function deleteElement() {
    deleteApi(element.id)
      .then(() => {
        const auxElementsArray = elementsArray.filter(item => item.id !== element.id);
        setElementsArray(auxElementsArray);
        navigation.navigate(indexNavigation);
      })
      .catch(() => {
      });
  }

  function handleGetAssociations() {
    const body = { id: element.id };
    getRecipeAssociations(body)
      .then((res) => {
        setDependencies(res);
        setShowModal(true);
      })
      .catch(() => {
      });
  }

  function setShowAll(condition) {
    menuVisible(condition);
    setShowModal(condition);
  }

  return (

    <View>
      <DeleteModal
        show={showModal}
        setShow={setShowAll}
        dependencies={dependencies}
        handleDelete={deleteElement}
        title={isRecipe ? 'Eliminar receta' : 'Eliminar menú'}
        description={'Esta receta se encuentra en los siguientes menús:'}
        sureMessage={isRecipe ? '¿Estás seguro que deseas eliminar esta receta?' :
          '¿Estás seguro que deseas eliminar este menú?'}/>
      {(isRecipe) ? (
        <TouchableOpacity style={[styles.menuOption, styles.edit]}
          onPress={() => navigation.navigate(editNavigation, {
            recipe: element.recipe,
            recipes: elementsArray,
            setRecipes: setElementsArray,
          })}>
          <Text style={styles.edit}>Editar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.menuOption, styles.edit]}
          onPress={() => navigation.navigate(editNavigation, {
            menu: element.menu,
            menus: elementsArray,
            setMenus: setElementsArray,
          })}>
          <Text style={styles.edit}>Editar</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={[styles.menuOption, styles.delete]}
        onPress={isRecipe ? handleGetAssociations : () => setShowModal(true)}>
        <Text style={styles.delete}>Borrar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ShowMenuOptions;
