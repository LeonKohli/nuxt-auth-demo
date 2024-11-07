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

  modules: [
    'nuxt-auth-utils',
    'nuxt-resend',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    'nuxt-security'
  ],
  colorMode: {
    classPrefix: '',
    classSuffix: ''
  },

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui'
  },

  typescript: {
    strict: false
  },

  security: {
    headers: {
      contentSecurityPolicy: {
        'script-src': ["'self'", "'unsafe-eval'", "'unsafe-inline'", "https:"]
      }
    }
  }
})