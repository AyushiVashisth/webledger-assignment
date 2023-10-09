import { createContext, useState } from "react";

export const AccountContext = createContext(null);

const GoogleAccount = ({ children }) => {
  const [googleAccount, setGoogleAccount] = useState(null);

  return (
    <AccountContext.Provider
      value={{
        googleAccount,
        setGoogleAccount
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default GoogleAccount;
