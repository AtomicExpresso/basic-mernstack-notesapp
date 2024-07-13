import React from 'react';
import useAuthContext from './useAuthContext.tsx';

export default function useLogout() {
  const {dispatch} = useAuthContext();

  const logout = () => {
    //Remove user from local storage
    localStorage.removeItem('user')

    //Dispatch logout action
    dispatch({type: 'LOGOUT'})
  }

  return {logout}
}