// const withCSS = require('@zeit/next-css');
// const pipe = require('lodash/fp/pipe');

// removed withCSS plugin. does not support css imports from node_modules
module.exports = {
  webpack: config => {
    // Load SVGs inline
    config.module.rules.push({
      test: /\.svg$/,
      use: { loader: 'svg-inline-loader', options: {} }
    });
    return config;
  }
};
