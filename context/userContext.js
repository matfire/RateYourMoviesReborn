import { createContext } from "react";

const userContext = createContext({
  session_id: "",
  setSessionId: (u) => {},
})

export default userContext;