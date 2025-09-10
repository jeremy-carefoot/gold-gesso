const AuthConfig = {
    disableServerSideAuth: false,
    sessionRefresh: {
      enablePeriodically: false,
      enableOnWindowFocus: false
    },
    provider: {
      type: 'local',
      pages: {
        login: '/login'
      },
      endpoints: {
        signIn: { path: '/login/', method: 'post' },
        signOut: { path: '/logout/', method: 'post' },
        signUp: { path: '/register/', method: 'post' },
        getSession: { path: '/user/', method: 'get' },
      },
      token: {
        signInResponseTokenPointer: '/access',
        maxAgeInSeconds: 3600,
        // TODO secureCookieOnly in production
        httpOnlyCookieAttribute: false
      },
      refresh: {
        isEnabled: true,
        endpoint: { path: '/token/refresh/', method: 'post' },
        refreshOnlyToken: false,
        token: {
          signInResponseRefreshTokenPointer: '/refresh',
          refreshResponseTokenPointer: '/access',
          refreshRequestTokenPointer: '/refresh',
          maxAgeInSeconds: 604800,
          // TODO secureCookieOnly in production
          httpOnlyCookieAttribute: false
        }
      },
      session: {
        dataType: {
          id: 'number',
          username: 'string',
          email: 'string',
          first_name: 'string',
          last_name: 'string'
        }
      }
    }
};

export default AuthConfig;