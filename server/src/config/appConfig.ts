import 'dotenv/config';

export default {
  image_url_local: process.env.IMAGE_URL_LOCAL || process.env.IMAGE_URL_REMOTE,
};
