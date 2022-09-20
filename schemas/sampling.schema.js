import * as Yup from "yup";

const samplingSchema = Yup.object().shape({
  date: Yup.date().required(),
  glycemie: Yup.number().required(),
  insuline: Yup.number().required(),
});

export default samplingSchema;
