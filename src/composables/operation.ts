import type { Record } from '@/types/record'
import { useAuth } from './auth'

export function useOperation() {
  const { getToken } = useAuth()

  async function performOperation(operationId: string, payload: string): Promise<Record> {
    const res = await fetch(new URL(`v1/operations/${operationId}/perform`, import.meta.env.VITE_API_BASE_URL), {
      method: 'POST',
      body: payload,
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })
    if (!res.ok) {
      throw new Error(`failed with error: ${res.status}`)
    }

    return await res.json()
  }

  return {
    performOperation,
  }
}