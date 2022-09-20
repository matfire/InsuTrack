import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/user.atom";
import Input from "../components/Input";
import loginSchema from "../schemas/login.schema";
import { account } from "../utils/client";

export default function Login() {
  const router = useRouter();
  const setUser = useSetRecoilState(userAtom);
  const formik = useFormik({
    onSubmit: async (values) => {
      toast.loading("signing in", { id: "signup" });
      try {
        await account.createEmailSession(values.email, values.password);
        const user = await account.get();
        setUser(user);
        toast.success("welcome back", { id: "signup" });
        router.push("/dashboard");
      } catch (error) {
        toast.error("something went wrong, please try again later", {
          id: "signup",
        });
      }
    },
    validationSchema: loginSchema,
    initialValues: {
      password: "",
      email: "",
    },
  });

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            <Input
              name="email"
              type="email"
              label="email"
              placeholder="enter email here"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onReset={formik.handleReset}
              error={formik.errors.email}
            />
            <Input
              name="password"
              type="password"
              label="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onReset={formik.handleReset}
              error={formik.errors.password}
            />
            <p>
              or sign in <Link href="/login">here</Link>
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
