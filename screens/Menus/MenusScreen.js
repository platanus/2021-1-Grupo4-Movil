import React, {
  useEffect,
  useState,
  useLayoutEffect,
} from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MenuRow from '../../components/menuRow';
import styles from '../../styles/Menus/indexStyles';

/* eslint max-statements: [2, 15] */
function Menus({ navigation }) {
  const getMenus = useStoreActions((actions) => actions.getMenus);
  const globalMenus = useStoreState((state) => state.menus.menus);
  const setGlobalMenus = useStoreActions((actions) => actions.setMenus);

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
            setGlobalMenus,
          })}
        />
      ),
      headerTitle: 'Menus',
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, menus]);

  useEffect(() => {
    getMenus()
      .then((res) => {
        setGlobalMenus(res);
        setMounted(true);
      })
      .catch(() => {
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMenus(globalMenus);
  }, [globalMenus]);

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <Icon
          name='add'
          size={30}
          style={styles.navIcon}
          onPress={() => navigation.navigate('Nuevo Menu', {
            isNew: true,
            menus,
            setMenus,
          })}
        />
      ),
      headerTitle: 'Menús',
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (menus.length && mounted) {
    return (
      <ScrollView>
        {menus.map((menu) => (
          <MenuRow
            key={menu.id}
            navigation={navigation}
            menu={menu}
            menus={menus}
            setMenus={setMenus}
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
