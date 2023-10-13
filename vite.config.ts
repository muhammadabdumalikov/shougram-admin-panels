import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(() => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  return {
    // vite config
    define: {
      'process.env': `"${process.env.NODE_ENV}"`,
    },
    plugins: [react(), tsconfigPaths()],
  };
});
