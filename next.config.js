/** @type {import('next').NextConfig} */
const nextConfig = {
       output: 'export',
       basePath: '/nepune_place',
       images: {
        loader: 'custom',
        loaderFile: './imageLoader.ts',
      },
     }
     
     module.exports = nextConfig
