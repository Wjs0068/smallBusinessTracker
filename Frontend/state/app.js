import { atom } from "recoil";

export const AppState = atom({
  key: "AppState",
  default: {
    avatarClicked: false,
    logoutClicked: false,
    createBusiness: false,
    openBusiness: false,
    showLoading: false,
    enterExpense: false,
    enterSale: false,
  },
});
