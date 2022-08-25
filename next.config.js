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
      'justicehub.in',
      '65.0.11.237',
      'localhost',
      'strapi.ndp.civicdatalab.in',
      'ndp.ckan.civicdatalab.in',
    ],
    formats: ['image/webp'],
  },
};

module.exports = withPlugins([withTM, withBundleAnalyzer], nextConfig);