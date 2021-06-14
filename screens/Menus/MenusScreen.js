import React, {
  useEffect,
  useState,
  useLayoutEffect,
} from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Text, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MenuRow from '../../components/menuRow';
import styles from '../../styles/Menus/indexStyles';
import colors from '../../styles/appColors';

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
          color={colors.kitchengramWhite}
          style={{ paddingRight: 10 }}
          onPress={() => navigation.navigate('Nuevo Menu', {
            isNew: true,
            menus,
          })}
        />
      ),
      headerTitle: 'Menus',
    });
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

  if (menus.length && mounted) {
    return (
      <View style={styles.container}>
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
        </ScrollView>
      </View>
    );
  }

  return (mounted) && (
    <View style={styles.container}>
      <Text>
        Aun no tienes menus
      </Text>
    </View>
  );
}

export default Menus;
