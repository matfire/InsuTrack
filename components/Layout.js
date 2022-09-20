import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/user.atom";
import { account } from "../utils/client";

export default function Layout({ children }) {
  const setUser = useSetRecoilState(userAtom);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const tmp = await account.get();
        setUser(tmp);
      } catch {
        router.push("/login");
      }
    };

    getUser();
  }, []);

  return <>{children}</>;
}
