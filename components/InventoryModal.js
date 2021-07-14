
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
              <Text style={styles.modalDescription}>
                {description}
              </Text>
              <ScrollView>
                {dependencies.filter((ingredient) => ingredient.attributes.minimumQuantity >
                 ingredient.attributes.inventory).map((ingredient, i) => (
                  (<Text
                    key={i}
                    style={styles.modalText}>
                    {`${ingredient.attributes.name}  ${ingredient.attributes.inventory}` + 
                    ` / ${ingredient.attributes.minimumQuantity} un.`}
                  </Text>)))}
              </ScrollView>
            </>)}
          <View style={styles.modalButtonsContainer2}>
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
