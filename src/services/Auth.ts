export async function Login(payload: string): Promise<{ access_token: string }> {
  const url = new URL('v1/login', import.meta.env.VITE_API_BASE_URL)
  const res = await fetch(url, {
    method: 'POST',
    body: payload,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const body: { access_token: string } = await res.json()

  return res.ok ? body : await Promise.reject(body)
}
