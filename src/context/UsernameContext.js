import { createContext, useContext, useState } from "react";

const UsernameContext = createContext();

export function useUsername() {
  return useContext(UsernameContext);
}

export function UsernameProvider({ children }) {
  const [registeredUsername, setRegisteredUsername] = useState();

  const saveUsername = () => {
    localStorage.getItem("registeredUsername");
  };


  const clearUsername = () => {
    setRegisteredUsername("");
    localStorage.removeItem("registeredUsername"); // Remove the username from local storage
  };

  return (
    <UsernameContext.Provider
      value={{
        registeredUsername,
        setRegisteredUsername,
        clearUsername,
        saveUsername,
      }}
    >
      {children}
    </UsernameContext.Provider>
  );
}
