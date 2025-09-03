export type ErrorMap = Record<number, string>;

export const BaseFetchErrorMap: ErrorMap = {
    // Client Errors
  400: "Oops! The information you sent was incorrect. Please double-check your input and try again.",
  401: "Looks like you aren't signed in. Please log in to continue.",
  403: "You don't have permission to access this. If you think this is a mistake, please contact support.",
  404: "We can't find the page you're looking for. It might have been moved or deleted.",
  408: "We took too long to get a response. Please check your internet connection and try again.",
  409: "There was a conflict with your request. Try refreshing the page and submitting again.",
  410: "This page is no longer available.",
  429: "You've sent too many requests in a short time. Please wait a moment and try again.",
  // Server Errors
  500: "Something went wrong on our end. We're working to fix it! Please try again in a few minutes.",
  501: "This feature isn't available yet. Check back later for updates.",
  502: "Oops! We're having trouble connecting to our servers. We're working on it.",
  503: "We're currently down for maintenance. We'll be back online soon!",
  504: "We're taking too long to connect. Please check your internet connection and try again.",
};

export const LoginErrorMap: ErrorMap = {
    401: 'Invalid username or password'
};