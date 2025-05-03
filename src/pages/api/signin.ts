export const prerender = false
import type { APIRoute } from 'astro'
import { API_URL } from '@/const'

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData()
  const nickname = data.get('nickname')
  const password = data.get('password')

  if (!nickname || !password) 
    return new Response(
      JSON.stringify({
        message: 'Existem campos vazios'
      }),
      { status: 401 }
    )

  const res = await fetch(API_URL + '/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nickname: data.get("nickname"),
      password: data.get("password")
    })
  }).then(res => {
    if (res.status === 400) {
      return { token: null }
    }

    return res.json()
  })

  if (res.token) {
    return new Response(JSON.stringify(res), {
      headers: {
        'Set-Cookie': `access-token=${res.token}; Max-Age=7200; HttpOnly; SameSite=Strict; Path=/;`
      },
      status: 200
    })
  }

  return new Response(JSON.stringify({message: "Nome de usuário e/ou senha errados..."}), {status: 400})
}
