/* eslint-disable no-magic-numbers */
import { View, Text, Modal, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from '../styles/deleteModalStyles';

function InventoryModal({ show, setShow, dependencies, title, description }) {
  return (
    <Modal
      visible={show}
      transparent={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>
            {title}
          </Text>
          {(dependencies.length > 0) && (
            <>
              <Text style={styles.modalDescriptionCentered}>
                {description}
              </Text>
              <ScrollView style={styles.scroll}>
                {dependencies.filter((ingredient) => ingredient.attributes.minimumQuantity >
                 ingredient.attributes.inventory).map((ingredient, i) => (
                  (<Text
                    key={i}
                    style={styles.modalText}>
                    {`${ingredient.attributes.name}  ${Math.round(ingredient.attributes.inventory * 100) / 100}` +
                    ` / ${ingredient.attributes.minimumQuantity} un.`}
                  </Text>)))}
              </ScrollView>
            </>)}
          <View style={styles.modalButtonsContainerColumn}>
            <TouchableOpacity
              style={styles.confirmButton2}
              onPress={() => setShow(false)}
            >
              <Text style={[styles.buttonText, styles.confirmButtonText]}>
                Listo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>

  );
}

export default InventoryModal;
