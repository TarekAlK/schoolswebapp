import {createContext, useContext, useState} from 'react'

export const AuthContext = createContext({})
//const AuthUpdateContext = createContext()

export function AuthProvider({children}) {
    const [user, setUser] = useState({})

    return (
        <AuthContext.Provider value={[user, setUser]}>
                {children}
        </AuthContext.Provider>
    )
    // function addUser(authenticatedUser) {
    //     return setUser(authenticatedUser)
    // }

    // const updateValue = (newValue) => {
    //     setUser(newValue);
    //   };
    

    // return (
    //     <AuthContext.Provider value={user}>
    //         <AuthUpdateContext.Provider value={addUser}>
    //             {children}
    //         </AuthUpdateContext.Provider>
    //     </AuthContext.Provider>
    // )
}

export const useAuth = () => {
    //const context = useContext(AuthContext)

    // if(!context) {
    //     throw new Error('useAuth must be used within an AuthProvider')
    // }
    return useContext(AuthContext)
}