import tailwindcss from "@tailwindcss/vite"; 

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiBase: ''
    }
  },
  ui: {
    colorMode: false 
  },
  modules: [
    '@nuxt/ui'
  ],
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  nitro: {
    devProxy: {
      '/api': {
        target: process.env.NUXT_PUBLIC_API_BASE,
        changeOrigin: true
      }
    }
  }
})
