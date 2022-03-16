import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    session_id: "",
    account_id: ""
  }
})