import { atom } from "recoil";

const categoriesAtom = atom({
  default: [],
  key: "categories",
});

export default categoriesAtom;
