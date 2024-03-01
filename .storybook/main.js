module.exports = {
  staticDirs: ["../public"],
  stories: ["../src/components/**/*.stories.js"],
  presets: [],
  addons: [],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: false,
  },
};
