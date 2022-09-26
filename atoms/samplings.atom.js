import { atom } from "recoil";

const samplingsAtom = atom({
  key: "samplings",
  default: [],
});

export default samplingsAtom;
