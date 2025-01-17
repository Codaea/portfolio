// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
  ],
  content: {
    documentDriven: {
      injectPage: false,
    },
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
      langs: [
        'typescript',
        'bash',
        'json',
        'yaml',
        'sql',
      ]
    }
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            'w95': ['/public/w95a.woff2']
          }
        }
      }
    }
  }
});
