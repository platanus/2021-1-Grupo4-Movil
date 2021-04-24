const initialState = {
    logged: false,
    
  }
  
  const loginReducer = (state= initialState, action) => {
      const newState = { ...state};
      switch (action.type) {
            case 'LOGIN_SUCCESS':
                newState.logged = true;
                return newState;
        default:
          return state;
      }
    };
    
    export default loginReducer;