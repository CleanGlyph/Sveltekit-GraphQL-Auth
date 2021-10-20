import jwt_decode from 'jwt-decode'
export function respond (body) {
  if (body.error) {
    return { status: 401, body }
  }
  const json = JSON.stringify(body.signIn)
  const decodedUser = jwt_decode(json)
  return {
    headers: {
      'set-cookie': `jwt=${json}; Path=/; HttpOnly`
    },
    body: decodedUser
  }
}
