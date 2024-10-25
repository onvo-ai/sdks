import type { Preview, ReactRenderer } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: "onvo-root-style",
        dark: "onvo-dark onvo-root-style",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
