/* eslint-disable no-unused-vars */
/* eslint-disable max-statements */

import React, { useEffect, useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import { View, Text, ScrollView } from 'react-native';
import styles from '../../styles/authStyles';
import MenuRow from '../../components/menuRow';

function Menus(props) {
  const { navigation } = props;

  const getMenus = useStoreActions((actions) => actions.getMenus);

  const [mounted, setMounted] = useState(false);
  const [menus, setMenus] = useState([]);

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
          <MenuRow key={menu.id} menu={menu} navigation={navigation}/>
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
