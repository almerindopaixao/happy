import { Request, Response } from 'express';
import * as Yup from 'yup';
import { getRepository } from 'typeorm';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UsersModel from '../models/UsersModel';

interface Data {
  email?: string;
  password?: string;
}

class TokenController {
  async store(req: Request, res: Response) {
    try {
      const userRepository = getRepository(UsersModel);

      const data: Data = req.body;

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('O e-mail do usuário é obrigatório')
          .email('O e-mail informado é inválido'),
        password: Yup.string().required('A senha do usuário é obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const user = await userRepository.findOne({
        where: { email: data.email },
      });

      if (!user) {
        return res.status(401).json({
          errors: ['Usuário não encontrado'],
        });
      }

      if (!(await bcryptjs.compare(data.password as string, user.password))) {
        return res.status(401).json({
          errors: ['Senha inválida'],
        });
      }

      const { id, email } = user;

      const token = jwt.sign(
        { id, email },
        process.env.TOKEN_SECRET as string,
        {
          expiresIn: process.env.TOKEN_EXPIRATION,
        },
      );

      return res
        .status(201)
        .json({ token, usuario: { nome: user.name, id, email } });
    } catch (e) {
      console.log(e);

      return res.status(400).json({
        errors: e,
      });
    }
  }
}

export default new TokenController();
