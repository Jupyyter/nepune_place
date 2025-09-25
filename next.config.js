// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing output configuration
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,

  // Add the images configuration here
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/vi/**', // Allows any path under /vi/ on i.ytimg.com
      },
      // If you have other external image domains in the future,
      // add them as additional objects in this array.
      // For example:
      // {
      //   protocol: 'https',
      //   hostname: 'another-domain.com',
      // },
    ],
  },
};

module.exports = nextConfig;