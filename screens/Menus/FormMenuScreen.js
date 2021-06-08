import { useStoreActions } from 'easy-peasy';
import { View, Text, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../../styles/Menus/form';
import RecipeRow from '../../components/menuRecipeRow';

function MenuForm(props) {
  const { navigation } = props;
  const [menuName, setMenuName] = useState('');
  const [menuPortions, setMenuPortions] = useState('');
  const [menuTotalPrice, setMenuTotalPrice] = useState(0);

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.mainDataView}>
          <Text style={styles.title}>Datos Básicos</Text>
          <Text style={styles.subtitle}>Nombre</Text>
          <TextInput
            style={styles.textInput}
            value={menuName}
            onChangeText={setMenuName}/>
          <Text style={styles.subtitle}>Porciones</Text>
          <TextInput
            style={styles.textInput}
            value={menuPortions}
            onChangeText={setMenuPortions}/>
        </View>
        <View style={styles.selectRecipesRow}>
          <View style={styles.centerView}>
            <Text style={styles.title}>Recetas seleccionadas</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Agregar Receta', {})}
            style={[styles.button, styles.searchButton]}>
            <Text style={styles.searchText}>Buscar Recetas</Text>
          </TouchableOpacity>
        </View>
        {<RecipeRow key={0}/>}
        {<RecipeRow key={1}/>}
      </ScrollView>
      <View style={styles.totalMenuRow}>
        <Text style={styles.totalPriceText}>Total del Menú</Text>
        <Text style={styles.totalPriceNumber}>${menuTotalPrice}</Text>
      </View>
      <View style={styles.menuButtonsRow}>
        <View style={styles.twoButtonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text>Volver</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.twoButtonContainer}>
          <TouchableOpacity style={[styles.button, styles.actionButton]}>
            <Text style={styles.actionText}>Crear Menú</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default MenuForm;
