import multer from 'multer';
import { resolve, extname } from 'path';

const rand = () => Math.floor(Math.random() * 10000 + 10000);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${rand()}${extname(file.originalname)}`);
  },
});

export default multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new multer.MulterError(
          'LIMIT_UNEXPECTED_FILE',
          'Os arquivos enviados precisam ser do formato png ou jpg',
        ),
      );
    }

    return cb(null, true);
  },

  limits: {
    fileSize: 1024 * 1024,
  },
});
