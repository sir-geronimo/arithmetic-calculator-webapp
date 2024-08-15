import { useAuth } from '@/composables/auth'
import type { Operation } from '@/types/operation'
import type { Record } from '@/types/record'

export async function CreateOperation(payload: string): Promise<Operation> {
  const { getToken } = useAuth()
  const res = await fetch(new URL('v1/operations', import.meta.env.VITE_API_BASE_URL), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: payload,
  })

  const body = await res.json()

  return res.ok ? body : await Promise.reject(body)
}

export async function PerformOperation(opts: {
  operationId: string
  payload: string
}): Promise<Record> {
  const { getToken } = useAuth()
  const res = await fetch(
    new URL(`v1/operations/${opts.operationId}/perform`, import.meta.env.VITE_API_BASE_URL),
    {
      method: 'POST',
      body: opts.payload,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )

  const body = await res.json()

  return res.ok ? body : await Promise.reject(body)
}
