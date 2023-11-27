import { useState, createContext, useEffect } from "react";
import axios from "axios"

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null)
  useEffect(async () => {
    if(!user){
     await axios.get('/profile').then(({data}) => {
       setUser(data)
     })
    }
  },[])
  return <UserContext.Provider value={{user, setUser}}>{children};</UserContext.Provider>;
}
