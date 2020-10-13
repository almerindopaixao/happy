import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string[];
}

import OrphanagesModel from '../models/OrphanagesModel';

import orphanageView from '../views/orphanages_view';

class OrphanagesController {
  async Index(req: Request, res: Response) {
    try {
      const orphanagesRepository = getRepository(OrphanagesModel);

      const orphanages = await orphanagesRepository.find({
        relations: ['images'],
      });

      return res.json(orphanageView.renderMany(orphanages));
    } catch (e) {
      return res.status(400).json({
        errors: {
          message: 'Não foi possível listar os ofanatos',
          error: e,
        },
      });
    }
  }
  async Store(req: Request, res: Response) {
    try {
      const orphanagesRepository = getRepository(OrphanagesModel);

      const {
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
      } = req.body;

      const requestImages = req.files as Express.Multer.File[];

      const images = requestImages.map((images) => {
        return { path: images.filename };
      });

      const data = {
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
        images: images,
      };

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome precisa ser enviado'),
        latitude: Yup.number().required('Latitude precisa ser enviada'),
        longitude: Yup.number().required('Longitude precisa ser enviada'),
        about: Yup.string().required('Sobre precisa ser enviado').max(300),
        instructions: Yup.string().required(),
        opening_hours: Yup.string().required(),
        open_on_weekends: Yup.boolean().required(),
        images: Yup.array(
          Yup.object().shape({
            path: Yup.string().required(),
          }),
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const orphanage = orphanagesRepository.create(data);

      await orphanagesRepository.save(orphanage);

      return res.status(201).json({
        success: {
          message: 'Orfanato cadastrado com sucesso',
          data: orphanage,
        },
      });
    } catch (error) {
      const errors: ValidationErrors = {};

      if (error instanceof ValidationError) {
        error.inner.forEach((err) => {
          errors[err.path] = err.errors;
        });
      }

      console.log(error);

      return res.status(400).json({
        message: 'Erro ao cadastrar orfanato',
        errors,
      });
    }
  }

  async Show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const orphanagesRepository = getRepository(OrphanagesModel);

      const orphanage = await orphanagesRepository.findOneOrFail(id, {
        relations: ['images'],
      });

      return res.status(200).json(orphanageView.render(orphanage));
    } catch (e) {
      return res.status(400).json({
        errors: {
          message: 'Erro ao encontrar o orfanato',
          error: e,
        },
      });
    }
  }
}

export default new OrphanagesController();
