const path = require('path')

// const ROOT_PATH = path.resolve(__dirname, '..', '..')
const SRC_PATH = path.resolve(__dirname, '../src')

module.exports = {
  stories: [
    path.resolve(SRC_PATH, '../src/**/*.stories.mdx'),
    path.resolve(SRC_PATH, '**/*.stories.@(ts|tsx)'),
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-actions/register',
    '@storybook/addon-controls/register',
    '@storybook/addon-links/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  // webpackFinal: (config) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     $storybook: __dirname,
  //     '@avail/*': path.resolve(ROOT_PATH, 'src'),
  //     react: require.resolve('react'),
  //     'react-dom': require.resolve('react-dom'),
  //     'styled-components': require.resolve('styled-components'),
  //   }

  //   return config
  // },
}
