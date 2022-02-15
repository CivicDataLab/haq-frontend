const withTM = require('next-transpile-modules')(['echarts', 'zrender']);

module.exports = withTM();

module.exports = {
  reactStrictMode: true,
};

module.exports = {
  experimental: {
    styledComponents: true,
  },
};
