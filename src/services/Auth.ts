export async function Login(payload: string): Promise<{ access_token: string }> {
  const res = await fetch(new URL('v1/login', import.meta.env.VITE_API_BASE_URL), {
    method: 'POST',
    body: payload,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const body: { access_token: string } = await res.json()

  return res.ok ? body : await Promise.reject(body)
}
