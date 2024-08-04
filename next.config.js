/** @type {import('next').NextConfig} */
const nextConfig = {
       basePath: '/nepune_place',
       images: {
        //unoptimized: true,
        loader: 'custom',
        loaderFile: './imageLoader.ts',
      },
     }
     
     module.exports = nextConfig
