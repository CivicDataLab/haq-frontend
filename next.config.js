const withTM = require('next-transpile-modules')(['echarts', 'zrender']);

module.exports = withTM({
  images: {
    domains: ['placekitten.com'],
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
