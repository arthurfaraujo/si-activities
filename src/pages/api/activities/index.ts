export const prerender = false
import type { APIRoute } from 'astro'

const API_URL = process.env.API_URL

export const POST: APIRoute = async ({ request }) => {
  const res = await fetch(API_URL + '/activities', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(await request.json())
  })

  return new Response(JSON.stringify(res))
}

export const GET: APIRoute = async (context) => {
  const res = await fetch(API_URL + '/activities',
    {
      headers: {
      "Authorization": `Bearer ${await context.session?.get('accessToken')}`
    }}
  ).then(res => res.json())

  return new Response(JSON.stringify(res))
}
