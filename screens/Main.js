import React, { useState } from 'react';
import { useStoreState } from 'easy-peasy';
import LogIn from './LogInScreen';
import SignUp from './SignUpScreen';
import EditIngredient from './Ingredients/EditIngredientScreen';
import Ingredients from './Ingredients/IngredientsScreen';

function Main() {
  const currentUser = useStoreState((state) => state.currentUser);
  const [loginView, setLoginView] = useState(true);

  const [editIngredient, setEditIngredient] = useState(false);

  if (currentUser) {
    if (editIngredient) {
      return (
        <EditIngredient setEditIngredient={setEditIngredient} />
      );
    }

    return (
      <Ingredients setEditIngredient={setEditIngredient} />
    );
  }

  if (loginView) {
    return (
      <LogIn setLoginView={ setLoginView } />
    );
  }

  return (
    <SignUp setLoginView ={ setLoginView }/>
  );
}

export default Main;
