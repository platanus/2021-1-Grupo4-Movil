import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../styles/appColors';
import styles from '../styles/Menus/index';

function MenuRow(props) {
  const { menu, navigation } = props;

  return (
    <TouchableOpacity
      style={styles.menuRow}
      onPress={() => navigation.navigate('Menu', menu)}
      key={menu.id}>
      <View style={styles.left}>
        <Text style={styles.name}>{menu.attributes.name}</Text>
        <View style={styles.menuInfo}>
          <Icon name='people' color={colors.grayIcon} size={23} />
          <Text style = {styles.subtitle}>
              XX Personas
          </Text>
        </View>
        <View style={styles.menuInfo}>
          <Icon name='restaurant-menu' color={colors.grayIcon} size={23} />
          <Text style = {styles.subtitle}>XX porciones</Text>
        </View>
      </View>
      <View style={styles.right}>
        <Text style = {styles.price}>$XX.XX</Text>
      </View>
    </TouchableOpacity>
  );
}

export default MenuRow;
