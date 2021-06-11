import React, { useState } from 'react';
import { useStoreState } from 'easy-peasy';
import { NavigationContainer } from '@react-navigation/native';

import LogIn from './LogInScreen';
import SignUp from './SignUpScreen';
import HomeTabs from '../navigators/bottomNavigation';

function Main() {
  const currentUser = useStoreState((state) => state.currentUser);
  //const [loginView, setLoginView] = useState(true);
  const loginView = useStoreState((state) => state.loginView);

  if (currentUser) {
    return (
      <NavigationContainer>
        <HomeTabs />
      </NavigationContainer>
    );
  }

  if (loginView) {
    return (
      <LogIn />
    );
  }

  return (
    <SignUp />
  );
}

export default Main;
