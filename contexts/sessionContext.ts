import { createContext } from "react";

const sessionContext = createContext({
    session:undefined,
    setSession: (t:string) => {}
});

const SessionContextProvider = sessionContext.Provider

export default sessionContext;
export {SessionContextProvider}