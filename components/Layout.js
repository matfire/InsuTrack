import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import categoriesAtom from "../atoms/categories.atom";
import userAtom from "../atoms/user.atom";
import { account, database } from "../utils/client";

export default function Layout({ children }) {
  const setUser = useSetRecoilState(userAtom);
  const setCategories = useSetRecoilState(categoriesAtom);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const tmp = await account.get();
        setUser(tmp);
        const cats = await database.listDocuments(
          process.env.NEXT_PUBLIC_DB_NAME,
          process.env.NEXT_PUBLIC_CATEGORIES_TABLE
        );
        setCategories(cats.documents);
        setLoading(false);
      } catch {
        setLoading(false);
        router.push("/login");
      }
    };

    getUser();
  }, []);

  if (loading)
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <p>Loading, please wait...</p>
      </div>
    );

  return <>{children}</>;
}
