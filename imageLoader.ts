import { ImageLoaderProps } from 'next/image';

const imageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  return `https://raw.githubusercontent.com/Jupyyter/nepune_place/main/public/imgs/${src}?w=${width}&q=${quality || 75}`;
};

export default imageLoader;