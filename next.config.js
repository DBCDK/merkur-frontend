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
