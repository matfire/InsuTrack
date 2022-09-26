import { Query } from "appwrite";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import categoriesAtom from "../atoms/categories.atom";
import samplingsAtom from "../atoms/samplings.atom";
import userAtom from "../atoms/user.atom";
import { account, database } from "../utils/client";

export default function Layout({ children }) {
  const [user, setUser] = useRecoilState(userAtom);
  const setCategories = useSetRecoilState(categoriesAtom);
  const setSamplings = useSetRecoilState(samplingsAtom);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
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

    getData();
  }, []);
  useEffect(() => {
    const getSamplings = async () => {
      let offset = 0;
      let data = [];
      setLoading(true);
      while (true) {
        const tmp = await database.listDocuments(
          process.env.NEXT_PUBLIC_DB_NAME,
          process.env.NEXT_PUBLIC_SAMPLING_TABLE,
          [
            Query.limit(100),
            Query.offset(100 * offset),
            Query.equal("user", user?.$id),
          ]
        );
        data = [...data, ...tmp.documents];
        if (data.length >= tmp.total) break;
        offset += 1;
      }
      setSamplings(data);
      setLoading(false);
    };
    if (user !== null) getSamplings();
  }, [user]);

  if (loading)
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <p>Loading, please wait...</p>
      </div>
    );

  return <>{children}</>;
}
