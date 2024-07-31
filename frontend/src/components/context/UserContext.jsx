import React, { createContext, useState } from 'react'



export const UserContext = createContext(null)

const UserContextProvider = (props) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const url = "http://localhost:1001/";
  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
    url
  }

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider