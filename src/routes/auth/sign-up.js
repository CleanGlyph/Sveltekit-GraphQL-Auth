
  import { ApolloClient, gql } from '@apollo/client/core'
import { HttpLink } from '@apollo/client/link/http'
import { InMemoryCache } from '@apollo/client/cache/'
import jwt_decode from 'jwt-decode'

export async function post (request) {
  try {
    /*
			Example End point to handle specially unauthenticated traffic to the server
		*/

    const link = new HttpLink({
      uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
      fetch
    })
    const client = new ApolloClient({
      link: link,
      cache: new InMemoryCache(),
      fetchPolicy: 'no-cache'
    })

    const { username, password } = request.body
    const query = gql`
    mutation SignUp($username: String!, $password: String!) {
        signUp(username: $username, password: $password)
      }
		`
    const body = await client.mutate({
      mutation: query,
      variables: { username, password }
    })

    if (body.error) {
        return { status: 401, body }
      }
   
      const json = JSON.stringify(body.data.signUp)
      const decodedUser = jwt_decode(json)
      return {
        headers: {
          'set-cookie': `jwt=${json}; Path=/; HttpOnly`
        },
        body: decodedUser
      }
  } catch (err) {
    console.log(err)
    const errors = {
      status: 500,
      error_detail: err
    }

    return { status: 401, body:{ error: errors } };
  };
}
