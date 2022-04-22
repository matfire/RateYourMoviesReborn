import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    session_id: 0,
    account_id: 0
  }
})