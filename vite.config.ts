import { defineConfig } from 'vite'
import path from 'path'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solidPlugin({})],
  server: {
    port: 54321,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
      '@styles': path.resolve(__dirname, 'styles'),
      '@components': path.resolve(__dirname, 'components'),
      '@directives': path.resolve(__dirname, 'directives'),
    },
  },
  build: {
    target: 'esnext',
    minify: true,
  },
  optimizeDeps: {
    extensions: ['jsx', 'js', 'ts', 'tsx'],
  },
})
