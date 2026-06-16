import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  env: (config) => ({
    ...config,
    NEXT_PUBLIC_GEN3_COMMONS_NAME: 'gen3',
  }),
  "framework": "@storybook/nextjs",
  "staticDirs": [
    "../public"
  ]
};
export default config;
