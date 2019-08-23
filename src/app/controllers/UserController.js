import UserModel from '../models/User';

class UserController {
  async store(req, res) {
    const { email } = req.body;
    const userExists = await UserModel.findOne({ where: { email } });
    if (userExists)
      return res.status(400).json({ error: 'User already exists' });

    const { id, name } = await UserModel.create(req.body);
    return res.json({ id, name, email });
  }

  async update(req, res) {
    const { userId } = req;
    const { name, email, oldPassword, password } = req.body;
    const user = await UserModel.findByPk(userId);
    if (email !== user.email) {
      const userExists = await UserModel.findOne({ where: { email } });
      if (userExists)
        return res.status(400).json({ error: 'E-mail already registered' });
    }
    if (password) {
      const passwordIsValid = await user.checkPassword(oldPassword);
      if (!passwordIsValid)
        return res.status(400).json({ error: 'Invalid password' });
    }
    const { id } = await user.update({ name, email, password });
    return res.json({ id, name, email });
  }
}

export default new UserController();
