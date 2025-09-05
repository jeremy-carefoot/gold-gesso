const AuthConfig = {
    disableServerSideAuth: true,
    baseURL: process.env.NUXT_PUBLIC_API_BASE,
    provider: {
      type: 'local',
      pages: {
        login: '/login'
      },
      endpoints: {
        signIn: { path: '/auth/login/', method: 'post' },
        signOut: { path: '/auth/logout/', method: 'post' },
        signUp: { path: '/auth/register/', method: 'post' },
        getSession: { path: '/auth/user/', method: 'get' },
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
      },
      session: {
        dataType: {
          id: 'number',
          username: 'jeremycarefoot',
          email: 'string',
          first_name: 'string',
          last_name: 'string'
        }
      }
    }
};

export default AuthConfig;