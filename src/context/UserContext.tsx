"use client"

import { logout, validateToken } from "@/actions/auth";
import { Usuario } from "@/actions/user";
import React from "react";

type IUserContext = {
    user: Usuario | null;
    setUser: React.Dispatch<React.SetStateAction<Usuario | null>>;
}

const UserContext = React.createContext<IUserContext | null>(null);


export const useUser = () => {
    const context = React.useContext(UserContext);
    if(context === null) {
        throw new Error("useContext deve estar dentro do Provider");
    }
    return context;
}

export const UserContextProvider= ({
    children,
    user,
}: {
    children: React.ReactNode;
    user: Usuario | null;
}) => {
    const [userState, setUser] = React.useState<Usuario | null>(user); 

    React.useEffect(()=>{
        async function validate(){
            const {ok} = await validateToken();
            if(!ok){
                await logout();
            }
        }
        if(userState){
            validate();
        }
    },[])

    return <UserContext.Provider value={{ user: userState, setUser }}>{children}</UserContext.Provider>
}