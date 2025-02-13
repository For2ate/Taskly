import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: 'Taskly',
    tags: [
      { 
        tag: 'link',
        attrs: {
          href: 'https://fonts.googleapis.com/css2?family=Sora&display=swap',
          rel: 'stylesheet',
        }, 
      },
    ],
  },
});
