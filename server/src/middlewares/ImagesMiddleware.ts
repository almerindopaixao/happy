import { Request, Response, NextFunction, IRouter } from 'express';
import multerConfig from '../config/uploads';

const upload = multerConfig.array('images');

function imagesMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): IRouter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return upload(req, res, function (err: any) {
    if (err) {
      return res.status(400).json({
        errors: [err.field],
      });
    }

    next();
  });
}

export default imagesMiddleware;
