import { useAuth } from '@/composables/auth'

export async function GetBalance(): Promise<number> {
  const { getToken } = useAuth()

  const res = await fetch(new URL('v1/balance', import.meta.env.VITE_API_BASE_URL), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  })

  const body = await res.json()

  return res.ok ? body : await Promise.reject(body)
}
