import ImagesModel from '../models/ImagesModel';
import appConfig from '../config/appConfig';

export interface ImagesView {
  id: number;
  url: string | undefined;
}

export default {
  render(image: ImagesModel): ImagesView {
    return {
      id: image.id,
      url: `${appConfig.image_url_local}/${image.path}`,
    };
  },

  renderMany(images: ImagesModel[]): ImagesView[] {
    return images.map((image) => this.render(image));
  },
};
