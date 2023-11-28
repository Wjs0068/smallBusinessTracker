import { atom } from "recoil";

export const BusinessState = atom({
  key: "BusinessState",
  default: {
    businesses: [],
  },
});
