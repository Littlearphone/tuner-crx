import vue from '@vitejs/plugin-vue'

const { resolve } = require('path')
/**
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue()],
  server: {
    open: '/navigator.html'
  },
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: {
        navigator: resolve(__dirname, 'navigator.html'),
        option: resolve(__dirname, 'options.html'),
        popup: resolve(__dirname, 'popup.html')
      }
    }
  }
}
