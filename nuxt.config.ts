// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  app: {
    baseURL: '/warehouse/', // 仓库名
    head: {
      title: 'Warehouse Management System',
      meta: [
        { name: 'description', content: '智能仓库管理系统，提升效率，安全可靠。' },
        { name: 'keywords', content: '仓库,管理系统,智能,物流' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
    }
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
  components: {
    dirs: ["~/components", "~/components/Icons"],
  },
})
