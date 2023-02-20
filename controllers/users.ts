import { request, Request, Response } from 'express';
import User from '../models/user';

const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll({where: { status: true }});

  return res.json({ users })
}

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      msg: `No existe un usuario con el id ${id}`
    })
  }

  return res.json({ user })
}

const postUser = async (req: Request, res: Response) => {
  const { body } = req;
  let user;

  try {
    const emailExists = await User.findOne({
      where: { email: body.email}
    })

    if (emailExists) {
      return res.status(400).json({
        msg: 'Ya existe un usuario con el email ' + body.email
      })
    }

    user = User.build(body);
    await user.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Hable con el administrador' });
  }

  return res.json({
    user
  })
}

const putUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  let user;

  try {
    user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        msg: 'No existe un usuario con el id ' + id
      })
    }

    await user.update(body);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Hable con el administrador' });
  }
  
  res.json(user);
}

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  let user;

  try {
    user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        msg: 'No existe un usuario con el id ' + id
      })
    }

    await user.update({ status: false });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Hable con el administrador' });
  }

  return res.status(200).json(user);
}

export {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
}