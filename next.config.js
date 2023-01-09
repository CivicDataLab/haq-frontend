const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['echarts', 'zrender']);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
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

module.exports = withPlugins([withTM, withBundleAnalyzer], nextConfig);