import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  // Proxy to external api
  const apiUrl = useRuntimeConfig().apiBase;
  const target = joinURL(apiUrl, event.path);

  return proxyRequest(event, target);
})