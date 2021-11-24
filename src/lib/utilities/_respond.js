import jwtDecode from 'jwt-decode'
export function respond (body) {
  if (body.error) {
    return { status: 401, body }
  }
  const json = JSON.stringify(body.signIn)
  const decodedUser = jwtDecode(json)
  // Add better security settings for cookies production here
  // make sure to have good CORS settings
  return {
    headers: {
      'set-cookie': `jwt=${json}; Path=/; HttpOnly`
    },
    body: decodedUser
  }
}
