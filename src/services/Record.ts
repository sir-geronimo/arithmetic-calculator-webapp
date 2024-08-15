import { useAuth } from '@/composables/auth'
import type { Record } from '@/types/record'

export async function GetRecords(opts: { q: string; page: number; per_page: number }): Promise<{
  data: Record[]
  page: number
  total: number
}> {
  const { getToken } = useAuth()

  const url = new URL('v1/records', import.meta.env.VITE_API_BASE_URL)
  for (const [key, val] of Object.entries(opts)) {
    if (val) {
      url.searchParams.set(key, val)
    }
  }

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  })

  const body = await res.json()

  return res.ok ? body : await Promise.reject(body)
}
