type GalleryImageItem = {
  path: string;
  key: string;
};

const buildGalleryImages = (imagesPath: string[]): GalleryImageItem[] => {
  const imageKeyCounters = new Map<string, number>();

  return imagesPath.map((path) => {
    const occurrence = (imageKeyCounters.get(path) ?? 0) + 1;
    imageKeyCounters.set(path, occurrence);

    return {
      path,
      key: `${path}-${occurrence}`,
    };
  });
};

type OfferGalleryProps = {
  imagesPath: string[];
};

const OfferGallery = ({ imagesPath }: OfferGalleryProps) => (
  <div className="offer__gallery">
    {buildGalleryImages(imagesPath).map(({ path, key }) => (
      <div className="offer__image-wrapper" key={key}>
        <img className="offer__image" src={path} alt="Photo studio" />
      </div>
    ))}
  </div>
);

export { OfferGallery };
