export const prerender = false
import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({loggedOut: true}), {
    headers: {
      'Set-Cookie': 'access-token=deleted; Max-Age=0; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;'
    },
    status: 200
  })
}
