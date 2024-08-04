import { ImageLoaderProps } from 'next/image';

export const imageLoaderUrl = "https://raw.githubusercontent.com/Jupyyter/nepune_place/main/public/imgs";

const imageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  const url = `https://raw.githubusercontent.com/Jupyyter/nepune_place/main/public/imgs/${src}`;
  console.log('Image URL:', url);
  return `${imageLoaderUrl}/${src}?w=${width}&q=${quality || 75}`;
};

export default imageLoader;