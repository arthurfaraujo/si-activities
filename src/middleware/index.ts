import { isLoggedIn } from '@/utils/auth'
import { defineMiddleware } from 'astro:middleware'

const permit = ['/api/signin', '/api/signup', '/signin', '/signup']

export const onRequest = defineMiddleware(async (context, next) => {
  if (!(await isLoggedIn(context)) && !permit.includes(context.url.pathname)) {
    const url = new URL(context.request.url)
    const baseUrl = `${url.protocol}//${url.host}`

    return next(new Request(baseUrl + '/signin'))
  }

  context.locals.isAdmin = (await context.session?.get('user'))?.roles
    .map(role => role.description)
    .includes('admin')
  context.locals.username = (await context.session?.get('user'))?.name
  
  return next()
})
