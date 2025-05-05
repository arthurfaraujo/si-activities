import type { APIContext } from 'astro'

export async function isLoggedIn(
  context: APIContext<Record<string, any>, Record<string, string | undefined>>
): Promise<boolean> {
  return await context.session?.get('accessToken') != undefined
}
