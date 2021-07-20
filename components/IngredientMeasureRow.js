import React, { useState, useEffect } from 'react';
import { TextInput, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';
import regexNumber from '../utils/regexNumber';
import styles from '../styles/Ingredients/formStyles';
import pickers from '../styles/customPickerStyles';
import colors from '../styles/appColors';

function IngredientMeasureRow({ measure, handleMeasureChange, isDefault }) {
  const [measuresOptions, setMeasuresOptions] = useState(['Unidad', 'Kilo', 'Gramo', 'Litro', 'Mililitro',
    'Oz', 'Taza', 'Cucharada', 'Cucharadita', 'Otra']);
  const [measureName, setMeasureName] = useState(measure.name);
  const [otherMeasureSelected, setOtherMeasureSelected] = useState(false);
  const [otherMeasureName, setOtherMeasureName] = useState('');

  useEffect(() => {
    if (measure.name && !measuresOptions.includes(measure.name)) {
      setMeasuresOptions([measure.name, ...measuresOptions]);
    }
    if (measure.name === 'Otra') setOtherMeasureSelected(true);
    else setOtherMeasureSelected(false);
    setMeasureName(measure.name);
  }, [measure, measuresOptions, measure.name]);

  function handleNewMeasure() {
    if (!otherMeasureName) return;
    handleMeasureChange({ name: otherMeasureName });
    setOtherMeasureName('');
  }

  return (
    <>
      <View style={styles.rowContainer}>
        <View style={styles.inputUnitContainer}>
          <TextInput
            style={styles.input}
            placeholder="Cantidad de ingrediente..."
            keyboardType="number-pad"
            returnKeyType='done'
            value={measure.quantity.toString()}
            onChangeText={(text) => handleMeasureChange({ quantity: regexNumber(text.replace(',', '.')) })}
          />
        </View>
        <View style={styles.inputUnitContainer}>
          <View style={styles.dropDown}>
            <RNPickerSelect
              style={pickers.customPickerStyles}
              key={'-1'}
              placeholder={{
                label: 'Seleccionar',
                value: '',
              }}
              value={measureName}
              onValueChange={(value) => handleMeasureChange({ name: value })}
              items={measuresOptions.map((name, index) => ({ label: name, value: name, key: index }))}
              Icon={() => <Icon name='chevron-down' size={25} color={colors.kitchengramGray600} />}
            />

          </View>
        </View>
        {isDefault ? null :
          <View>
            <Icon name='close-outline'
              size={30}
              color={colors.kitchengramGray600}
              onPress={() => handleMeasureChange({ isRemoved: true })}
            />
          </View>
        }
      </View>
      {otherMeasureSelected ?
        <View style={styles.rowContainer}>
          <View style={styles.inputNewMeasureContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nombre de Medida..."
              returnKeyType='done'
              value={otherMeasureName}
              onChangeText={setOtherMeasureName}
              onEndEditing={() => handleNewMeasure()}
            />
          </View>
          <View>
            <Icon name='checkmark-outline'
              size={30}
              color={colors.kitchengramGreen500}
              onPress={() => handleNewMeasure()}
            />
          </View>
        </View> : null
      }
    </>
  );
}

export default IngredientMeasureRow;
