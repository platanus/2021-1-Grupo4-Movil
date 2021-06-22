import React from 'react';
import { useStoreState } from 'easy-peasy';
import { NavigationContainer} from '@react-navigation/native';

import LogIn from './LogInScreen';
import SignUp from './SignUpScreen';
import HomeTabs from '../navigators/bottomNavigation';
import Spinner from '../components/Spinner';

function Main() {
  const currentUser = useStoreState((state) => state.currentUser);
  const loginView = useStoreState((state) => state.loginView);
  const showLoadingSpinner = useStoreState((state) => state.showLoadingSpinner);

  if (currentUser) {
    return (
      <>
        <NavigationContainer>
          <HomeTabs />
        </NavigationContainer>
        {showLoadingSpinner && <Spinner /> }
      </>
    );
  }

  if (loginView) {
    return (
      <>
        <LogIn />
        {/* {showLoadingSpinner && <Spinner /> } */}
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
