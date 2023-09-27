/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['echarts', 'zrender']);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'content.girleducation.in',
    ],
    formats: ['image/webp'],
  },
};

module.exports = buildConfig = (_phase) => {
  const plugins = [withBundleAnalyzer, withTM];
  const config = plugins.reduce((acc, plugin) => plugin(acc), {
    ...nextConfig,
  });
  return config;
};
