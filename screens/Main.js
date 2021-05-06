import React, { useState } from 'react';
import { Text } from 'react-native';
import { useStoreState } from 'easy-peasy';
import LogIn from './LogInScreen';
import SignUp from './SignUpScreen';
import Recipes from './Recipes/RecipesScreen';

function Main() {
  const currentUser = useStoreState((state) => state.currentUser);
  const [loginView, setLoginView] = useState(true);
  // <Text>{currentUser.email}</Text>
  // <Text>{currentUser.authentication_token}</Text>

  if (currentUser) {
    return (
      <Recipes/>
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
