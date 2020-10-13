import OrphanageModel from '../models/OrphanagesModel';
import imagesView, { ImagesView } from './images_view';

interface OrphanageView {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: ImagesView[];
}

export default {
  render(orphanage: OrphanageModel): OrphanageView {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      images: imagesView.renderMany(orphanage.images),
    };
  },

  renderMany(orphanages: OrphanageModel[]): OrphanageView[] {
    return orphanages.map((orphanage) => this.render(orphanage));
  },
};
