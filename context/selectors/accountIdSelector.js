import { selector } from "recoil";
import { userState } from "../atoms/user";

export const accountIdSelector = selector({
  key: 'userAccountState',
  get: (({get}) => {
    const user = get(userState)
    return user.account_id
  })
})