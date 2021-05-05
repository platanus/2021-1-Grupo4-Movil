import React, { useState } from 'react';
import { useStoreState } from 'easy-peasy';
import { NavigationContainer } from '@react-navigation/native';

import LogIn from './LogInScreen';
import SignUp from './SignUpScreen';
import HomeTabs from '../navigators/bottomNavigation';
import EditIngredient from './Ingredients/EditIngredientScreen';

function Main() {
  const currentUser = useStoreState((state) => state.currentUser);
  const [loginView, setLoginView] = useState(true);

  if (true) {
    return (
      <NavigationContainer>
        <HomeTabs />
      </NavigationContainer>
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
