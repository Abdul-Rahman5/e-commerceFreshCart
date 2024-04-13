import { createContext, useState } from "react";


export let UserCotext=createContext();
export default function UserCotextProvider(props) {
  const [userData, setUserData] = useState(null);
  
    return <UserCotext.Provider value={{userData,setUserData}}>
        {props.children}
    </UserCotext.Provider>
    
}