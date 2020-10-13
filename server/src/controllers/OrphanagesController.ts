import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import OrphanagesModel from '../models/OrphanagesModel';

class OrphanagesController {
  async Index(req: Request, res: Response) {
    try {
      const orphanagesRepository = getRepository(OrphanagesModel);

      const orphanages = await orphanagesRepository.find();

      return res.json({
        orphanages: orphanages,
      });
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
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body;

    try {
      const orphanagesRepository = getRepository(OrphanagesModel);

      const orphanage = orphanagesRepository.create({
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
      });

      await orphanagesRepository.save(orphanage);

      return res.status(201).json({
        success: {
          message: 'Orfanato cadastrado com sucesso',
          data: orphanage,
        },
      });
    } catch (e) {
      return res.status(401).json({
        errors: {
          message: 'Erro ao cadastrar orfanato',
          error: e,
        },
      });
    }
  }

  async Show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const orphanagesRepository = getRepository(OrphanagesModel);

      const orphanage = await orphanagesRepository.findOneOrFail(id);

      return res.status(200).json({
        success: {
          message: 'Orfanato encontrado com com sucesso',
          data: orphanage,
        },
      });
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
