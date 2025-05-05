export const prerender = false
import type { APIRoute } from 'astro'

const API_URL = process.env.API_URL

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData()
  const nickname = data.get('nickname')
  const password = data.get('password')
  const name = data.get('name')
  const email = data.get('email')

  if (!nickname || !password || !name || !email) {
    return new Response(
      JSON.stringify({
        message: 'Existem campos vazios'
      }),
      { status: 401 }
    )
  }

  const res = await fetch(API_URL + '/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nickname: nickname,
      password: password,
      email: email,
      name: name
    })
  }).then(res => {
    if (res.status === 201) {
      return res.json()
    }

    return {created: false}
  })

  if (res.id) {
    return new Response(JSON.stringify({created: true}), {
      status: 201
    })
  }

  return new Response(JSON.stringify({message: "Não foi possível criar o usuário", created: false}), {status: 400})
}
