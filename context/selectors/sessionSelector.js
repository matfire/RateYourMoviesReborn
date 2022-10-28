import { selector } from "recoil";
import { userState } from "../atoms/user";

export const sessionSelector = selector({
  key: 'userSessionState',
  get: (({get}) => {
    const user = get(userState)
    return user.session_id
  })
})