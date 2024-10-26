// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },
  runtimeConfig: {
    oauth: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      },
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
    },
    resend: {
      apiKey: process.env.NUXT_RESEND_API_KEY,
    },
  },

  modules: ['nuxt-auth-utils', '@nuxt/ui', 'nuxt-resend', '@nuxt/icon'],

  typescript: {
    strict: false
  }
})