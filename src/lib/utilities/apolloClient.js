
import { ApolloClient } from '@apollo/client/core'
import { HttpLink } from '@apollo/client/link/http'
import { InMemoryCache } from '@apollo/client/cache'
import { setContext } from '@apollo/client/link/context'

class Client {
  constructor (token) {
    
    Client._instance = this
    this.client = this.setupClient(token)
  }

  setupClient (token) {
    const link = new HttpLink({
      uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
      fetch
    })

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`
        }
      }
    })

    const client = new ApolloClient({
      credentials: 'include',
      link: authLink.concat(link),
      cache: new InMemoryCache()
    })

    return client
  }
}
export const client = Client
