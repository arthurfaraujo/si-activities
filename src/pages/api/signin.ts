export const prerender = false
import type { APIRoute } from 'astro'

const API_URL = process.env.API_URL

export const POST: APIRoute = async (context) => {
  const data = await context.request.formData()
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
    context.session?.set('accessToken', res.token)
    context.session?.set('user', res.user)
    context.session?.set('createdAt', new Date())
    context.session?.set('maxAge', 7200)

    return new Response(JSON.stringify(res), {
      status: 200
    })
  }

  return new Response(JSON.stringify({message: "Nome de usuário e/ou senha errados..."}), {status: 400})
}
