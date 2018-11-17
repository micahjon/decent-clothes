const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

module.exports = withBundleAnalyzer(
  withCSS(
    withSass({
      // Definition for static pages in app
      exportPathMap: function () {
        return {
          '/': { page: '/' },
          // '/home-draft': { page: '/home-draft' },
          '/about': { page: '/about' },
          // '/contact': { page: '/contact' },
          '/privacy': { page: '/privacy' },
          // '/callback': { page: '/oauth-callback' },
          // '/account': { page: '/account' },
          '/order': { page: '/order' },
          '/measurements': { page: '/measurements' },
          '/checkout': { page: '/checkout' },
        };
      },

      // Allow Markdown files to be imported as text
      webpack: config => {
        config.module.rules.push(
          {
            test: /\.md$/,
            use: 'raw-loader',
          },
          {
            test: /\.css$/,
            use: 'raw-loader',
          }
        );

        return config;
      },

      analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
      analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
      bundleAnalyzerConfig: {
        server: {
          analyzerMode: 'static',
          reportFilename: '../../bundles/server.html',
        },
        browser: {
          analyzerMode: 'static',
          reportFilename: '../bundles/client.html',
        },
      },
    })
  )
);

// const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

// module.exports = withBundleAnalyzer({
//   analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
//   analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
//   bundleAnalyzerConfig: {
//     server: {
//       analyzerMode: 'static',
//       reportFilename: '../../bundles/server.html'
//     },
//     browser: {
//       analyzerMode: 'static',
//       reportFilename: '../bundles/client.html'
//     }
//   }
// });
