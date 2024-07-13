import React, {useState} from "react";
import useAuthContext from "./useAuthContext.tsx";

export default function useSignup() {
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(null);
  const { dispatch } = useAuthContext();

  const signup = async (email: string, username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('http://localhost:4000/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({email, username, password})
    })

    const data = await response.json();

    if(!response.ok){
      setIsLoading(false);
      setError(data.error)
    }

    if(response.ok){
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(data))

      //update the auth context
      dispatch({type: 'LOGIN', payload: data})

      setIsLoading(false);
    }
  }

  return { signup, isLoading, error }
}