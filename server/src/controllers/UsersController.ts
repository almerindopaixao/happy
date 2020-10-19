import { Request, Response } from 'express';
import * as Yup from 'yup';
import { getRepository, QueryFailedError } from 'typeorm';
import bcryptjs from 'bcryptjs';

import UsersModel from '../models/UsersModel';

interface Data {
  name?: string;
  email?: string;
  password?: string;
}

class UsersController {
  async store(req: Request, res: Response) {
    try {
      const userRepository = getRepository(UsersModel);

      const data: Data = req.body;

      const schema = Yup.object().shape({
        name: Yup.string()
          .required('O nome do usuário é obrigatório')
          .max(255, 'O nome não pode conter mais de 255 caracteres')
          .min(3, 'O nome precisa conter mais de 3 caracteres'),
        email: Yup.string()
          .required('O e-mail do usuário é obrigatório')
          .email('O e-mail informado é inválido'),
        password: Yup.string()
          .required('A senha do usuário é obrigatória')
          .max(50, 'O nome não pode conter mais de 50 caracteres')
          .min(6, 'O nome precisa conter mais de 6 caracteres'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const password_hash = await bcryptjs.hash(data.password as string, 12);

      const user = userRepository.create({
        ...data,
        password: password_hash,
        passwordResetToken: 'token_default',
        passwordResetExpires: new Date(),
      });

      await userRepository.save(user);

      return res.status(201).json({
        success: 'Usuário criado com sucesso',
        content: {
          id: user.id,
          nome: user.name,
          email: user.email,
        },
      });
    } catch (e) {
      console.log(e);

      const errors: string[] = [];

      if (e instanceof QueryFailedError) {
        errors.push('O e-mail informado ja está cadastrado');
      }

      if (e instanceof Yup.ValidationError) {
        errors.push(...e.errors);
      }

      // e.code detail 23505
      return res.status(400).json({
        errors,
      });
    }
  }
}

export default new UsersController();
