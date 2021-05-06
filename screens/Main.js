import React, { useState } from 'react';
import { useStoreState } from 'easy-peasy';
import LogIn from './LogInScreen';
import SignUp from './SignUpScreen';
import Ingredients from './Ingredients/IngredientsScreen';

function Main() {
  const currentUser = useStoreState((state) => state.currentUser);
  const [loginView, setLoginView] = useState(true);

  if (currentUser) {
    return (
      <Ingredients />
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
