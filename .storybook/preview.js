import { MemoryRouter } from "react-router-dom";
import { themes } from '@storybook/theming';
import Style from "./style";

export const decorators = [
  (Story) => (
    <MemoryRouter initialEntries={["/"]}>
      <Style />
      <Story />
    </MemoryRouter>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // backgrounds: {
  //   default: 'light',
  //   values: [
  //     {
  //       name: 'light',
  //       value: 'rgb(245,245,244)',
  //     },
  //     {
  //       name: 'dark',
  //       value: 'rgb(41 37 36)',
  //     },
  //   ],
  // },
  darkMode: {
    // current: "dark",
    darkClass: "dark",
    dark: { ...themes.dark, appBg: 'rgb(41 37 36)' },
    // Override the default light theme
    light: { ...themes.normal, appBg: 'rgb(245,245,244)' },
    stylePreview: true,
  },
};
