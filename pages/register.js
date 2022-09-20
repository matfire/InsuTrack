import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Input from "../components/Input";
import loginSchema from "../schemas/register.schema";
import { account } from "../utils/client";

export default function Register() {
  const router = useRouter();
  const formik = useFormik({
    onSubmit: async (values) => {
      toast.loading("signing in", { id: "signup" });
      try {
        await account.create(
          "unique()",
          values.email,
          values.password,
          values.name
        );
        toast.success("account created", { id: "signup" });
        router.push("/login");
      } catch (error) {
        toast.error("something went wrong, please try again later", {
          id: "signup",
        });
      }
    },
    validationSchema: loginSchema,
    initialValues: {
      name: "",
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
              name="name"
              type="text"
              label="name"
              placeholder="enter name here"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onReset={formik.handleReset}
              error={formik.errors.name}
            />
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
