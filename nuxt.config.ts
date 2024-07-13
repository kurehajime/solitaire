// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: 'static'
  },
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})
