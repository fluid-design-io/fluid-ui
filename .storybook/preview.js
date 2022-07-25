import { MemoryRouter } from "react-router-dom";
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
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: 'rgb(245,245,244)',
      },
      {
        name: 'dark',
        value: 'rgb(41 37 36)',
      },
    ],
  },
  // darkMode: {
  //   current: "dark",
  //   darkClass: "dark",
  //   stylePreview: true,
  // },
};
