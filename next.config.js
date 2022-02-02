const withTM = require('next-transpile-modules')(['echarts', 'zrender']);

module.exports = withTM({
  publicRuntimeConfig: {
    DMS: 'https://justicehub.in',
    CMS: 'https://oddk.home.blog',
  },
});

module.exports = {
  reactStrictMode: true,
};

module.exports = {
  experimental: {
    styledComponents: true,
  },
};

module.exports = {
  images: {
    domains: ['placekitten.com'],
  },
};
