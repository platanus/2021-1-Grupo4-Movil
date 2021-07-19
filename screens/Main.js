import React, { useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import { NavigationContainer } from '@react-navigation/native';
import apiUtils from '../api/api';
import LogIn from './Users/LogInScreen';
import SignUp from './Users/SignUpScreen';
import ForgotPassword from './Users/forgotPasswordScreen';
import HomeTabs from '../navigators/bottomNavigation';
import Spinner from '../components/Spinner';

function Main() {
  const currentUser = useStoreState((state) => state.currentUser);
  const loggedOutView = useStoreState((state) => state.loggedOutView);
  const showLoadingSpinner = useStoreState((state) => state.showLoadingSpinner);

  useEffect(() => {
    if (currentUser.email) {
      apiUtils.api.defaults.headers = { 'Accept': 'application/json',
        'Content-Type': 'application/json', 'X-User-Email': currentUser.email,
        'X-User-Token': currentUser.authenticationToken };
    }
  }, [currentUser]);

  if (currentUser.email) {
    return (
      <>
        <NavigationContainer>
          <HomeTabs />
        </NavigationContainer>
        {showLoadingSpinner && <Spinner /> }
      </>
    );
  }

  if (loggedOutView === 'login') {
    return (
      <>
        <LogIn />
        {showLoadingSpinner && <Spinner /> }
      </>
    );
  } else if (loggedOutView === 'forgot_password') {
    return (
      <>
        <ForgotPassword />
        {showLoadingSpinner && <Spinner /> }
      </>
    );
  }

  return (
    <>
      <SignUp />
      {showLoadingSpinner && <Spinner /> }
    </>
  );
}

export default Main;
