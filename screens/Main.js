import React, { useState } from 'react';
import { Text } from 'react-native';
import { useStoreState } from 'easy-peasy';
import LogIn from './LogInScreen';
import SignUp from './SignUpScreen';

function Main() {
  const currentUser = useStoreState((state) => state.currentUser);
  const [loginView, setLoginView] = useState(true);

  if (currentUser) {
    return (
      <>
        <Text>{currentUser.email}</Text>
        <Text>{currentUser.authentication_token}</Text>
      </>
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
