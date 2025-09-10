import { useWebSocket } from '@vueuse/core'

export const useAssignmentWebSocket = () => {
  const config = useRuntimeConfig()
  const isRefreshing = ref(false)
  const lastUpdate = ref<Date | null>(null)
  
  // Build WebSocket URL based on API base URL
  const wsUrl = computed(() => {
    const apiUrl = config.public.apiBase || 'http://localhost:8000'
    return apiUrl.replace('http://', 'ws://').replace('https://', 'wss://') + '/ws/assignments/'
  })
  
  const {
    status,
    data,
    send,
    open,
    close
  } = useWebSocket(wsUrl.value, {
    autoReconnect: {
      retries: 3,
      delay: 1000,
      onFailed() {
        console.error('Failed to connect to WebSocket after 3 retries')
      },
    },
    heartbeat: {
      message: JSON.stringify({ type: 'ping' }),
      interval: 30000,
      pongTimeout: 5000,
    },
  })
  
  // Parse incoming messages
  const message = computed(() => {
    if (!data.value) return null
    try {
      return JSON.parse(data.value)
    } catch (e) {
      console.error('Failed to parse WebSocket message:', e)
      return null
    }
  })
  
  // Watch for message updates
  watch(message, (newMessage) => {
    if (!newMessage) return
    
    switch (newMessage.type) {
      case 'refresh_started':
        isRefreshing.value = true
        break
      case 'assignments_updated':
        isRefreshing.value = false
        lastUpdate.value = new Date()
        break
      case 'connection_established':
        console.log('WebSocket connected:', newMessage.message)
        break
      case 'pong':
        // Heartbeat response
        break
      default:
        console.log('Unknown WebSocket message type:', newMessage.type)
    }
  })
  
  return {
    status,
    message,
    isRefreshing: readonly(isRefreshing),
    lastUpdate: readonly(lastUpdate),
    connect: open,
    disconnect: close,
    send
  }
}