
import * as cookie from 'cookie'
import jwt_decode from 'jwt-decode'

export async function handle ({ request, resolve }) {
  // My end point sends it in a nicer format than I expected, so refer to sveltekit realworld example hook to deal with different JWT bases
  const cookies = cookie.parse(request.headers.cookie || '')
  const jwt = cookies.jwt && jwt_decode(cookies.jwt)
  request.locals.user = { token: cookies.jwt, ...jwt }
  return await resolve(request)
}

export function getSession ({ locals }) {
  return {
    user: locals.user && {
      username: locals.user.username
    }
  }
};
