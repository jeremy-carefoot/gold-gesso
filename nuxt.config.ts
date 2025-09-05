import tailwindcss from "@tailwindcss/vite"; 
import AuthConfig from './auth.config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/ui',
    '@sidebase/nuxt-auth'
  ],
  runtimeConfig: {
    public: {
      apiBase: ''
    }
  },
  ui: {
    colorMode: false // disables dark mode
  },
  icon: {
    localApiEndpoint: '/icon-service/icons',
  },
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
  },
  auth: AuthConfig
});