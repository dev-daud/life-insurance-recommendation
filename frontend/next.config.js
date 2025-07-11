/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  env: {
    CUSTOM_KEY: 'life-insurance-app',
  },
}

module.exports = nextConfig 
