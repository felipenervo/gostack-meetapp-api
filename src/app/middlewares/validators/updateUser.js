import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    name: Yup.string().required(),
    password: Yup.string().min(6),
    oldPassword: Yup.string()
      .min(6)
      .when('password', (password, field) =>
        password ? field.required() : field
      ),
    confirmPassword: Yup.string().when('password', (password, field) =>
      password ? field.required().oneOf([Yup.ref('password')]) : field
    ),
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
