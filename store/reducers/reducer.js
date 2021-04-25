const initialState = {
    logged: false,
    loginError: "",
    signUpError: ""
    
  }
  
  const loginReducer = (state= initialState, action) => {
      const newState = { ...state};
      switch (action.type) {
            case 'LOGIN_SUCCESS':
              newState.logged = true;
              return newState;
            case 'SIGN_UP_SUCCESS':
                newState.logged = true;
                return newState;
            case 'LOGIN_FAILED':
              newState.loginError = action.payload;
              return newState;
            case 'SIGN_UP_FAILED':
              newState.signUpError = action.payload;
              return newState
        default:
          return state;
      }
    };
    
    export default loginReducer;