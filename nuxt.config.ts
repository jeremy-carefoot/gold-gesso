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
    apiBase: '',
    public: {
      canvasBase: ''
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
  auth: AuthConfig
});