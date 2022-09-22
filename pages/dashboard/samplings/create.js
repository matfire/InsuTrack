import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";
import categoriesAtom from "../../../atoms/categories.atom";
import userAtom from "../../../atoms/user.atom";
import Input from "../../../components/Input";
import samplingSchema from "../../../schemas/sampling.schema";
import { createSamplingRecord } from "../../../utils/client";

export default function SamplingCreate() {
  const user = useRecoilValue(userAtom);
  const categories = useRecoilValue(categoriesAtom);
  const formik = useFormik({
    initialValues: {
      date: new Date(),
      glycemie: 0,
      insuline: 0,
      category: "",
    },
    validationSchema: samplingSchema,
    onSubmit: async (values) => {
      toast.loading("creating record", {
        id: "create",
      });
      await createSamplingRecord({ ...values, user: user.$id });
      toast.success("record created", { id: "create" });
    },
  });
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            <Input
              name="date"
              type="datetime-local"
              label="date"
              placeholder="enter date here"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onReset={formik.handleReset}
              error={formik.errors.date}
            />
            <Input
              name="glycemie"
              type="number"
              label="glycemie"
              value={formik.values.glycemie}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onReset={formik.handleReset}
              error={formik.errors.glycemie}
            />
            <Input
              name="insuline"
              type="number"
              label="insuline"
              value={formik.values.insuline}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onReset={formik.handleReset}
              error={formik.errors.insuline}
            />
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              name="category"
              id="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled value="">
                When was this sampling taken?
              </option>
              {categories.map((e) => (
                <option key={e.$id} value={e.$id}>
                  {e.name}
                </option>
              ))}
            </select>
            {formik.errors.category && (
              <p className="text-left text-red-500">{formik.errors.category}</p>
            )}
            <div className="card-actions justify-end">
              <button className="btn btn-primary" type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
