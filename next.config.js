const withPWA = require("next-pwa");

// module.exports = withPWA({
//   pwa: {
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//   },
//   reactStrictMode: true,
//   future: {
//     webpack5: true,
//   },
//   webpack: function (config, options) {
//     config.experiments = {};
//     return config;
//   },
// });
module.exports = {
  reactStrictMode: true,
  future: {
    webpack5: true,
  },
  webpack: function (config, options) {
    config.experiments = {};
    return config;
  },
};
