import React, {useState} from "react";
import useAuthContext from "./useAuthContext.tsx";

export default function useLogin() {
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(null);
  const { dispatch } = useAuthContext();

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    //Query DB for user info and see if the username and password match what's in the DB
    const response = await fetch('http://localhost:4000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password})
    })

    const data = await response.json();
    console.log(data)

    if(!response.ok){
      setIsLoading(false);
      setError(`${data}`)
    }
    if(response.ok){
      //Save user to localstorage
      localStorage.setItem('user', JSON.stringify(data));

      //update auth context
      dispatch({type: 'LOGIN', payload: data});
      console.log('yes')
      setIsLoading(false)
    }
  }
  
  return { login, isLoading, error }
}