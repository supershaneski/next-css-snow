module.exports = {
  webpack: function(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
  env: {
    siteTitle: 'Next.js | CSS Snow',
  },
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
  exportPathMap: async function() {
    return {
      '/': { page: '/' }
    };
  }
}