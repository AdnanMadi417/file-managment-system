export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  plugins: [
    './plugins/axios.ts',
    '~/plugins/toast.client.ts'
  ],
  ssr: true,
})