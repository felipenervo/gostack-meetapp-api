import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string().required(),
  });
  try {
    await schema.validate(req.body, { abortEarly: false });
  } catch (e) {
    const { errors } = e;
    return res
      .status(400)
      .json({ error: 'Validation fails', validationErrors: errors });
  }
  return next();
};
