import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://trybastion.ai',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
})
