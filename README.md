<!-- markdownlint-disable-next-line -->
<p align="center">
  <a href="https://fluid-design.io/docs/" rel="noopener" target="_blank"><img width="150" src="https://user-images.githubusercontent.com/13263720/205263424-c7458db9-a1ea-4b7c-8c0b-cfdc811fb5f4.png" alt="Fluid UI logo"></a>
</p>

<h1 align="center">Fluid UI</h1>

<div align="center">

[![NPM](https://img.shields.io/npm/v/@fluid-design/fluid-ui.svg)](https://www.npmjs.com/package/@fluid-design/fluid-ui)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/fluid-design-io/fluid-ui/blob/main/LICENSE)

</div>

Fluid UI is an elegant component library for React. It is built on top of mordern libraries like [tailwindcss](https://tailwindcss.com/), [headlessui](https://headlessui.dev/) and [framer-motion](https://www.framer.com/motion/).

Demo: [fluid-design.io/docs/](https://fluid-design.io/docs/)

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configure tailwind](#configure-tailwind)
- [Tailwind Plugins](#tailwind-plugins)
- [Examples](#examples)
- [Future Goals](#future-goals)
- [Issues](#issues)

## Introduction

- Beautiful by default: Fluid UI provides incorporates the best practices of modern design systems, and is designed to be beautiful by default.
- Tailwind CSS: Every element is built with Tailwind CSS, which means you can override any style with your own CSS.
- Themeable: By passing the `primary` color under `tailwind.config.js`, all components' accent colors will be updated accordingly.
- Customizable: You can use most of the components as is, but it can be customized to fit your needs. See the [documentation](https://fluid-design.io/docs/) for more details.

##  Getting Started

### Installation

```bash
npm install @fluid-design/fluid-ui

# or

yarn add @fluid-design/fluid-ui
```

### Configure tailwind

Add a primary color theme to your `tailwind.config.js` file,
you can go to [Color UI Generator](https://fluid-color.vercel.app/) to generate a color theme.

We recommend using non var-based color theme, because the library is using and transforming based on the given colors.
However, var-based color theme still works, but you might need to adjust the color theme manually.

```js tailwind.config.js
module.exports = {
  // Add the following to your tailwind.config.js file:
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@fluid-design/fluid-ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        gray: {
          50: '#f4f7fb',
          100: '#d8dbdf',
          200: '#bdc0c4',
          300: '#a2a5a9',
          400: '#888b8f',
          500: '#6f7276',
          600: '#575a5d',
          700: '#404346',
          800: '#2b2d30',
          900: '#17191c',
        },
      },
      // Other extended theme properties
    },
  },
  plugins: [
    require('@fluid-design/fluid-ui/src/plugin/core'), // main plugin
    require('@fluid-design/fluid-ui/src/plugin/button'), // for button component
  ],
};
```

## Tailwind Plugins

If you don't want to opt-in to use components, you can also use the tailwind plugins directly.

```js tailwind.config.js

module.exports = {
    //...
    plugins: [
    require('@fluid-design/fluid-ui/src/plugin/core'), // main plugin
    require('@fluid-design/fluid-ui/src/plugin/button'), // for button component
  ],
}
```

##  Examples

The [Example Page](http://fluid-design.io/docs/examples) provides many possiple ways to group components into a nice-looking ui.

It is the perfect starting point for learning and building your own app.

##  Future Goals

Fluid UI will continue to evolve and grow. Here are some of the features we are working on:

- [ ] Tab (doc) 📄
- [ ] Forms - Combobox (doc) 📄
- [ ] Forms - Validation  (doc) 📄
- [ ] Tooltip Plugin (doc) 📄
- [ ] Popover 🚧
- [ ] Dialog (Modal) 🚧

## Issues

We would love to hear from you! If you have any feedback or run into issues using our library, please file

an [issue](https://github.com/fluid-design-io/fluid/issues/new) on this repository.

