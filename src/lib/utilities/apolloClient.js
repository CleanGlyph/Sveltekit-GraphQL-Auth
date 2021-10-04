import fetch from 'node-fetch';
import { ApolloClient } from '@apollo/client/core/core.cjs.js';
import { HttpLink } from '@apollo/client/link/http/http.cjs.js';
import { InMemoryCache } from '@apollo/client/cache/cache.cjs.js';
import { setContext } from '@apollo/client/link/context/context.cjs.js';



class Client {
    constructor(token) {
        if (Client._instance) {
        }
        Client._instance = this;
        this.client = this.setupClient(token);
    }
   
    setupClient(token) {
        const link = new HttpLink({
            uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
            fetch
        });
        //Handles both auth/non-auth traffic

            const authLink = setContext((_, { headers }) => {
                return {
                    headers: {
                        ...headers,
                        authorization: `Bearer ${token}`
                    }
                };
            });

        const client = new ApolloClient({
            credentials: 'include',
            link: authLink.concat(link),
            cache: new InMemoryCache()
        });

        return client;
    }
}
export const client = Client;