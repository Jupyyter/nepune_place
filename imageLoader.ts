import { ImageLoaderProps } from 'next/image';

const imageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  return 'https://github.com/Jupyyter/nepune_place/tree/main/public/imgs${src}'
};

export default imageLoader;