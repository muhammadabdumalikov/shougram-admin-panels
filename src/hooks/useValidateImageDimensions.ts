import { useState } from 'react';
import { ImageSizeType } from 'types';

const useValidateImageDimensions = () => {
  const [imagesSizes, setImagesSizes] = useState<
    Record<string, ImageSizeType | ImageSizeType[] | undefined>
  >({});

  const setImageSizesInState = (source: string, fieldName: string) => {
    const image = new Image();
    image.onload = () => {
      setImagesSizes((prev) => ({
        ...prev,
        [fieldName]: { width: image.width, height: image.height },
      }));
    };
    image.src = source;
  };

  const setImageSizesArrayInState = (sources: string[], fieldName: string) => {
    setImagesSizes((prev) => ({
      ...prev,
      [fieldName]: [],
    }));

    const images: HTMLImageElement[] = [];
    for (let i = 0; i < sources.length; i++) {
      const image = new Image();
      images.push(image);
    }

    for (let i = 0; i < sources.length; i++) {
      images[i].onload = () => {
        setImagesSizes((prev) => {
          const prevFieldValue = prev[fieldName] as ImageSizeType[];

          if (prevFieldValue instanceof Array) {
            return {
              ...prev,
              [fieldName]: [
                ...prevFieldValue,
                { width: images[i].width, height: images[i].height },
              ],
            };
          } else {
            return {
              ...prev,
              [fieldName]: { width: images[i].width, height: images[i].height },
            };
          }
        });
      };
      images[i].src = sources[i];
    }
  };

  const deleteImageSizeValue = (fieldName: string) => {
    setImagesSizes((prev) => ({
      ...prev,
      [fieldName]: undefined,
    }));
  };

  return {
    imagesSizes,
    setImageSizesInState,
    setImageSizesArrayInState,
    deleteImageSizeValue,
  };
};

export default useValidateImageDimensions;
