import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/user.atom";
import { account } from "../utils/client";

export default function Layout({ children }) {
  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    const tmp = account.get();
    setUser(tmp);
  }, []);

  return <>{children}</>;
}
