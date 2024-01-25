/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    UNSPLASH_AK: process.env.UNSPLASH_AK,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
