import { View, Text, Modal, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from '../styles/deleteModalStyles';

function DeleteModal({ show, setShow, dependencies, handleDelete, title, description, sureMessage }) {
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
                {dependencies.map((recipe, i) =>
                  (<Text
                    key={i}
                    style={styles.modalText}>
                    {recipe.name}
                  </Text>))}
              </ScrollView>
            </>)}
          <Text style={styles.modalTitle}>
            {sureMessage}
          </Text>
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShow(false)}
            >
              <Text style={[styles.buttonText, styles.cancelButtonText]}>
                No
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                setShow(false);
                handleDelete();
              }}
            >
              <Text style={[styles.buttonText, styles.confirmButtonText]}>
                Sí, eliminar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>

  );
}

export default DeleteModal;
