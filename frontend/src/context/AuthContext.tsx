import React, {createContext, useReducer, useEffect} from "react";

// Creating the AuthContext to be used for providing and consuming authentication state
export const AuthContext = createContext()

// Reducer function to handle login and logout actions
export const authReducer = (state, action) => {
  // Checks type of action (Login or logout). If it's login, we send the user object with the value of the action payload. If action is logout, we set user to null (thus deleting the token)
  switch(action.type){
    case "LOGIN":
      return {user: action.payload}
    case "LOGOUT":
      return {user: null}
    default:
      return state
  }
}

// Context provider component to wrap around parts of the app that need access to authentication state
export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null // Set user to null by default
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) // Fetch user from localStorage

    // If a user was found in localStorage (their token is still valid), then set dispatch to type 'LOGIN' and the payload to the user object
    if (user) {
      dispatch({type: 'LOGIN', payload: user})
    }
  }, [])

  console.log('AuthContext state:', state)

  return (
    <AuthContext.Provider value={({...state, dispatch})}>
      {children}
    </AuthContext.Provider>
  )
}