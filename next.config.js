const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/**
 * @file
 * This is the configuration file for Next.js.
 *
 * See https://nextjs.org/docs/api-reference/next.config.js/introduction
 *
 * We set distDir, such that the build folder is located next to the storybook build
 */
module.exports = (phase, { defautConfig }) => {
  console.info("Next js phase: ", phase);
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    if (process.env.MOCK_SERVER === "true") {
      console.info(`Mock server activated`);
      process.env.FILESTORE_URL = process.env.MOCK_FILESTORE_URL;
    } else {
      process.env.FILESTORE_URL = process.env.FILESTORE_STAGING_URL;
    }
  }
  console.info(`Filestore url = ${process.env.FILESTORE_URL}`);

  return {
    distDir: "dist/next",
    i18n: {
      locales: ["da", "en"],
      defaultLocale: "da",
      localeDetection: false,
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });
      return config;
    },
  };
};
