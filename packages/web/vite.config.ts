import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@axios', replacement: resolve(__dirname, './src/axios') },
      { find: '@commons', replacement: resolve(__dirname, './src/commons') },
      { find: '@routes', replacement: resolve(__dirname, './src/routes') },
      { find: '@views', replacement: resolve(__dirname, './src/views') },
      {
        find: '@components',
        replacement: resolve(__dirname, './src/components'),
      },
    ],
  },
});
