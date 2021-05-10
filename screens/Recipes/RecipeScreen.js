/* eslint-disable max-statements */
/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useState,
} from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Icon } from 'react-native-elements';
import colors from '../../styles/appColors';
import styles from '../../styles/Recipes/singleRecipe';

function Recipe(props) {
  const { navigate, route } = props;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.recipeInfoContainer}>
        <View style={styles.recipeInfoRow}>
          <Icon name='timer' color={colors.recipeIcon} size='30' />
          <Text style={styles.infoText}> {route.params.cook_minutes} minuto(s)</Text>
        </View>
        <View style={styles.recipeInfoRow}>
          <Icon name='pie-chart' color={colors.recipeIcon} size='30' />
          <Text style={styles.infoText}> {route.params.portions} porcion(es)</Text>
        </View>
        <View style={styles.recipeInfoRow}>
          <Icon name='monetization-on' color={colors.recipeIcon} size='30' />
          <Text style={styles.infoText}> XX.XXX pesos</Text>
        </View>
      </View>
      <View style={styles.ingredientsContainer}>
        <Text style={styles.sectionTitleText}>Ingredientes</Text>
        <View style={styles.ingredientsList}>
          <Text style={styles.ingredientText}>Ingrediente</Text>
          <Text style={styles.ingredientText}>Ingrediente</Text>
          <Text style={styles.ingredientText}>Ingrediente</Text>
          <Text style={styles.ingredientText}>Ingrediente</Text>
          <Text style={styles.ingredientText}>Ingrediente</Text>
        </View>
      </View>
      <View style={styles.ingredientsContainer}>
        <Text style={styles.sectionTitleText}>Pasos</Text>
        <View style={styles.stepBox}>
          <Text style={styles.stepText}>Este es el paso 1</Text>
        </View>
        <View style={styles.stepBox}>
          <Text style={styles.stepText}>Este es el paso 1</Text>
        </View>
        <View style={styles.stepBox}>
          <Text style={styles.stepText}>Este es el paso 1</Text>
        </View>
        <View style={styles.stepBox}>
          <Text style={styles.stepText}>Este es el paso 1</Text>
        </View>
        <View style={styles.stepBox}>
          <Text style={styles.stepText}>Este es el paso 1</Text>
        </View>
        <View style={styles.stepBox}>
          <Text style={styles.stepText}>Este es el paso 1</Text>
        </View>
        <View style={styles.stepBox}>
          <Text style={styles.stepText}>Este es el paso 1</Text>
        </View>
        <View style={styles.stepBox}>
          <Text style={styles.stepText}>Este es el paso 1</Text>
        </View>
        <View style={styles.stepBox}>
          <Text style={styles.stepText}>Este es el paso 1</Text>
        </View>
        <View style={styles.stepBox}>
          <Text style={styles.stepText}>Este es el paso 1</Text>
        </View>
        <View style={styles.stepBox}>
          <Text style={styles.stepText}>Este es el paso 1</Text>
        </View>
        <View style={styles.stepBox}>
          <Text style={styles.stepText}>Este es el paso 1</Text>
        </View>
        <View style={styles.stepBox}>
          <Text style={styles.stepText}>Este es el paso 1</Text>
        </View>
        <View style={styles.stepBox}>
          <Text style={styles.stepText}>Este es el paso 1</Text>
        </View>
      </View>
    </View>
  );
}

export default Recipe;
