import jwt from 'jsonwebtoken';
import UserModel from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ where: { email } });
    if (!user || !(await user.checkPassword(password)))
      return res.status(401).json({ error: 'Invalid credentials' });

    const { id, name } = user;

    const token = await jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.json({
      user: { id, name, email },
      token,
    });
  }
}

export default new SessionController();
