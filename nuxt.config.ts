// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  app: {
    baseURL: '/warehouse/' // 仓库名
  },
  css: ["@/assets/css/main.css"],
  modules: [
    "@nuxt/image",
    "nuxt-icon",
    "@nuxtjs/tailwindcss", // Tailwind CSS
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
