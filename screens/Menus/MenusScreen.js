import React, { useEffect, useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import { Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/Providers/indexStyles';
import MenuRow from '../../components/menuRow';

function Menus({ navigation }) {
  const getMenus = useStoreActions((actions) => actions.getMenus);

  const [mounted, setMounted] = useState(false);
  const [menus, setMenus] = useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <Icon name='add'
          size={30}
          style={styles.navIcon}
          onPress={() => navigation.navigate('Nuevo Menu', {
            isNew: true,
            menus,
            setMenus,
          })}
        />
      ),
      headerTitle: 'Menus',
    });
  }, [navigation, menus]);

  useEffect(() => {
    getMenus()
      .then((res) => {
        setMenus(res);
        setMounted(true);
      })
      .catch(() => {
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (menus.length && mounted) {
    return (
      <ScrollView>
        {menus.map((menu) => (
          <MenuRow
            key={menu.id}
            menu={menu}
            navigation={navigation}
          />
        ))}
      </ScrollView>);
  }

  return (mounted) && (
    <Text>
      Aun no tienes menus
    </Text>
  );
}

export default Menus;
