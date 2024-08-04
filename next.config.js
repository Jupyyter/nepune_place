/** @type {import('next').NextConfig} */
const nextConfig = {
       output: 'export',
       basePath: '/nepune_place',
       images: {
        //unoptimized: true,
        loader: 'custom',
        loaderFile: './imageLoader.ts',
      },
     }
     
     module.exports = nextConfig
