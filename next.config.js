const withSass = require('@zeit/next-sass');
module.exports = withSass({
  // Definition for static pages in app
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/contact': { page: '/contact' },
    };
  },

  // Allow Markdown files to be imported as text
  webpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    return config;
  },
});
