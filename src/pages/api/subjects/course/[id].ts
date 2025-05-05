export const prerender = false
import type { APIRoute } from 'astro'

const API_URL = process.env.API_URL

export const GET: APIRoute = async ({ params, session }) => {
  const id = params.id

  const res = await fetch(API_URL + `/subjects/course/${id}`, {
    headers: {
      Authorization: `Bearer ${await session?.get('accessToken')}`
    }
  }).then(res => {
    return res.json()
  })

  return new Response(JSON.stringify(res))
}
