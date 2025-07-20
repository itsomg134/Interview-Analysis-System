/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'raw.githubusercontent.com',
      'storage.googleapis.com'
    ]
  }
};

module.exports = nextConfig;