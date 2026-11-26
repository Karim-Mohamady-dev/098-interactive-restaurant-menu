const react = require('@vitejs/plugin-react').default
const tailwindcss = require('@tailwindcss/vite').default
const { defineConfig } = require('vite')

module.exports = defineConfig({
  publicDir: false,
  plugins: [react(), tailwindcss()],
})
