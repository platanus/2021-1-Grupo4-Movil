import { useStoreActions } from 'easy-peasy';
import { View, Text, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';


function MenuForm(props) {
  const { navigation } = props;
  const [menuName, setMenuName] = useState('');
  const [menuPortions, setMenuPortions] = useState('0');
  const [menuTotalPrice, setMenuTotalPrice] = useState(0);
  const [menuSelectedRecipes, setMenuSelectedRecipes] = useState([]);


  return (
    <View>
      <View>
        <ScrollView>
          <View>
            <Text>Datos Básicos</Text>
            <Text>Nombre</Text>
            <TextInput
              value={menuName}
              onChangeText={setMenuName}/>
            <Text>Porciones</Text>
            <TextInput
              value={menuName}
              onChangeText={setMenuName}/>
          </View>
          <View>
            <Text>
              Recetas Seleccionadas
            </Text>
            <TouchableOpacity>
              Buscar Recetas
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <View>
        <View>
          <Text>Total del Menú</Text>
          <Text>${menuTotalPrice}</Text>
        </View>
        <View>
          <TouchableOpacity>
            Volver
          </TouchableOpacity>
          <TouchableOpacity>
            Crear Menú
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default MenuForm;