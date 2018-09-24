const withSass = require('@zeit/next-sass');
module.exports = withSass({
  // Definition for static pages in app
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/home-draft': { page: '/home-draft' },
      '/about': { page: '/about' },
      '/contact': { page: '/contact' },
      '/privacy': { page: '/privacy' },
      '/callback': { page: '/oauth-callback' },
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
