module.exports = {
  stories: [
    '../components/Button/Button.stories.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y'
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
};
