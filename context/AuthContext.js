import { createContext, useEffect, useState } from "react";
import {useRouter} from "next/router"
import { NEXT_URL } from "../config";  

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {checkUserLoggedIn()}, []);

  useEffect(() => {
    if(error !== null) {
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
    else return
  }, [error]);

    // Register User
    const registerUser = async (user) => {
      
      const res = await fetch(`${NEXT_URL}/api/register`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
      },
       body: JSON.stringify(user)
      })
      const data = await res.json();
      
     if(res.ok) {
      console.log("Register Worked!", data)
      setUser(data.user);
      router.push('/account/dashboard');
     }  else {

      if(Object.keys(data.message.error.details).length !== 0) {
        //console.log("In details:", data.message.error.details)
        setError(data.message.error.details.errors);
        setError(null);
      } else {
        console.log(data.message.error.message)
        setError([{message: data.message.error.message}]);
      }
     }   
    }

    // Login User
    const loginUser = async ({email:identifier, password}) => {
      console.log({identifier, password});

      
      const res = await fetch(`${NEXT_URL}/api/login`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
      },
       body: JSON.stringify({identifier, password})
      })
      const data = await res.json();

      console.log("This:", data)
      
     if(res.ok) {
      setUser(data.user);
      router.push('/account/dashboard');
     }  else {
      setError(data.message);
     }   
    }
      // logout User
  const logoutUser = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST'
    });

    if(res.ok) {
      setUser(null);
      router.push('/');
    }
  }
  // Check if user is logged in
  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    console.log("My data", data);

    if(res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  }

  return  (
    <AuthContext.Provider value={{user, error, registerUser, loginUser, logoutUser}}>
      {children}
    </AuthContext.Provider>
  ) 
}

export default AuthContext
