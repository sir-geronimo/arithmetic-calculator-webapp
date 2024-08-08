import { useAppStore } from '@/stores/app.store'

export function useAuth() {
  const authToken = "auth_token"
  const appStore = useAppStore()

  function getToken(): string | null {
    const token = window.sessionStorage.getItem(authToken)
    appStore.loggedIn = !!token

    return token
  }

  function setToken(token: string) {
    appStore.loggedIn = !!token

    return window.sessionStorage.setItem(authToken, token)
  }

  return {
    getToken,
    setToken,
  }
}