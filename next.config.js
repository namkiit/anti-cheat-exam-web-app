/** @type {import('next').NextConfig} */
const TerserPlugin = require('terser-webpack-plugin');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_debugger: false, // Do not remove debugger statements
            },
          },
        }),
      ];
    }
    return config;
  },
};

module.exports = nextConfig;
