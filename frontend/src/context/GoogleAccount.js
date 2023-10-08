import { createContext, useState } from 'react';

export const AccountContext = createContext(null);

const GoogleAccount = ({children}) => {

    const [ googleAccount, setgoogleAccount ] = useState();

    return (
        <AccountContext.Provider value={{ 
            googleAccount, 
             setgoogleAccount
        }}>
            {children}
        </AccountContext.Provider>
    )
}

export default GoogleAccount;