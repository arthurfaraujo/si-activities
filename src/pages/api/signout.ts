export const prerender = false
import type { APIRoute } from 'astro'

export const GET: APIRoute = async (context) => {
  context.session?.destroy()
  return new Response(JSON.stringify({loggedOut: true}), {
    status: 200
  })
}
