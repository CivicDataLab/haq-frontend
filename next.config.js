const withTM = require('next-transpile-modules')(['echarts', 'zrender']);

module.exports = {
  experimental: {
    styledComponents: true,
  },
};

module.exports = {
  reactStrictMode: true,
};

module.exports = withTM();




