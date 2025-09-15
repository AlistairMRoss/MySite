/** @type {import('tailwindcss').Config} */

export const content = [
  './src/**/*.{html,js,svelte,ts}'
];
export const theme = {
  extend: {
    fontFamily: {
      'custom': ['ubuntu-font', 'Arial', 'Ubuntu'],
    }
  },
};
export const plugins = [];
