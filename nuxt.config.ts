import tailwindcss from "@tailwindcss/vite"; 

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
  auth: {
    debugger: true,
    baseURL: process.env.NUXT_PUBLIC_API_BASE,
    provider: {
      type: 'local',
      pages: {
        login: '/login'
      },
      endpoints: {
        signIn: { path: '/auth/login/', method: 'post' },
        getSession: { path: '/auth/user/', method: 'get' },
        signUp: false, // TODO
        signOut: false, // TODO
      },
      token: {
        signInResponseTokenPointer: '/access',
        maxAgeInSeconds: 3600
      },
      refresh: {
        isEnabled: true,
        endpoint: { path: '/auth/token/refresh/', method: 'post' },
        token: {
          signInResponseRefreshTokenPointer: '/refresh',
          refreshResponseTokenPointer: '/refresh',
          refreshRequestTokenPointer: '/refresh',
          maxAgeInSeconds: 604800
        }
      }
    }
  }
});