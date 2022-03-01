const withTM = require('next-transpile-modules')(['echarts', 'zrender']);

module.exports = withTM({
  compiler: {
    styledComponents: true,
  },
});
