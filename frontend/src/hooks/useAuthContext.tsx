import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.tsx";

export default function useAuthContext() {
  const context = useContext<any>(AuthContext);

  if(!context){
    throw new Error("useAuthContext must be used inside an AuthContextProvider")
  }

  return context
}