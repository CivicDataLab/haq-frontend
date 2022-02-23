const withTM = require('next-transpile-modules')(['echarts', 'zrender']);

const config = {
  styledComponents: true,
};

module.exports = withTM({ config });
