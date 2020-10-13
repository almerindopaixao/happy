import multer from 'multer';

import multerConfig from '../config/uploads';

const upload = multer(multerConfig).array('images');

export default upload;
