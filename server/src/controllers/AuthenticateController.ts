import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import mailer from '../config/mailer';

import UsersModel from '../models/UsersModel';

interface Data {
  email?: string;
}

class AuthenticateController {
  async store(req: Request, res: Response) {
    const data: Data = req.body;

    try {
      const userRepository = getRepository(UsersModel);

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('O e-mail do usuário é obrigatório')
          .email('O e-mail informado é inválido'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const user = await userRepository.findOne({
        where: { email: data.email },
      });

      if (!user) {
        return res.status(400).json({
          errors: ['E-mail não encontrado'],
        });
      }

      const { id, email } = user;

      const now = new Date();

      now.setHours(now.getHours() + 1);

      const token = jwt.sign(
        { id, email },
        process.env.TOKEN_SECRET as string,
        {
          expiresIn: '1h',
        },
      );

      await userRepository.save({
        ...user,
        passwordResetToken: token,
        passwordResetExpires: now,
      });

      const mailOptions = {
        to: email,
        from: 'almerindopaixao@gmail.com',
        subject: 'Recuperação',
        text: `Você esqueceu sua senha? Não tem problema, utilize esse token: ${token}`,
        html: `
          <p>Você esqueceu sua senha? Não tem problema, utilize esse token: ${token}</p>
          <a href="https://www.google.com">clique aqui</a>
          `,
      };

      mailer.sendMail(mailOptions, function (error, info) {
        if (error)
          return res.status(400).json({
            errors: ['Não foi possível enviar o email de recuperação'],
          });

        return res.status(200).json({
          success: info,
        });
      });
    } catch (err) {
      const errors: string[] = [];

      if (err instanceof Yup.ValidationError) {
        errors.push(...err.errors);
        return res.status(400).json({
          errors: errors,
        });
      }

      res.status(400).json({
        errors: ['Infelizmente ocorreu um erro desconhecido'],
      });

      console.error(err);
    }
  }
}

export default new AuthenticateController();
