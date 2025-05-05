export const prerender = false
import type { APIRoute } from 'astro'

const API_URL = process.env.API_URL

export const POST: APIRoute = async ({ request, session }) => {
  const res = await fetch(API_URL + '/courses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await session?.get('accessToken')}`
    },
    body: JSON.stringify(await request.json())
  })

  return new Response(JSON.stringify(res))
}

export const GET: APIRoute = async ({session}) => {
  const res = await fetch(API_URL + '/courses', {
    headers: {
      'Authorization': `Bearer ${await session?.get('accessToken')}`
    },
  })
    .then(res => {
      return res.json()
  })

  return new Response(
    JSON.stringify(res)
  )
}
