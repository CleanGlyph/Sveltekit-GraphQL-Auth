
# This is old, and pre-sveltekit 1.0!!!
It *should* work after migration, I'll update ASAP if someone really wants it to be honest just put in an Issue 

# [Houdini](https://github.com/houdinigraphql/houdini) does this better with stores and with auth, however if you wanted something thinner and do all that coding yourself this is that.


# Boiler Plate Sveltekit GraphQL Bearer Auth
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Everything you need to build a Svelte + GraphQL project with a Bearer Token Auth. 

Based off of [Rodeny's Work](https://rodneylab.com/use-apollo-client-sveltekit/) 

## Install

### 1. NPM install
```bash
# create a new project in the current directory
npm install
```

### 2. Add a .env

Can use the VITE imports but I used `env-cmd` package to make it.

```bash
VITE_GRAPHQL_ENDPOINT=http://localhost:4000/
```
### 3. Run it

Use the commands bellow to run in dev or production

## Developing

Use the following to open it in hot reload:
```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev --open
```


## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.


## API Refrence

Using a [Neo4j-GraphQL-Boilerplate](https://github.com/CleanGlyph/Neo4jGraphQL-JS-Auth-Boilerplate), with the following definitions
``` JS
const typeDefs = `
   type User @exclude(operations: [CREATE, DELETE]) {
        id: ID @id
        username: String!
        password: String! @auth(rules: [{ allow: { id: "$jwt.sub" } }])
    }
    type Mutation {
        signUp(username: String!, password: String!): String! ### JWT
        signIn(username: String!, password: String!): String! ### JWT
    }
    }`
/*... custom resolvers*/
const resolvers = {
    Mutation: {
        signUp: async (_source, { username, password }) => {
            const [existing] = await User.find({
                where: {
                    username,
                },
            });

            if (existing) {
                throw new Error(`User with username ${username} already exists!`);
            }

            const [user] = await User.create({
                input: [
                    {
                        username,
                        password,
                    }
                ]
            });

            return jwt.sign({ sub: user.id }, "secret");
        },
        signIn: async (_source, { username, password }) => {
            const [user] = await User.find({
                where: {
                    username,
                },
            });

            if (!user) {
                throw new Error(`User with username ${username} not found!`);
            }
            if (password == user.password) {
                return  jwt.sign({ username: user.username,  sub: user.id}, "secret");
            } else {
                throw new Error(`Incorrect password for user with username ${username}!`);
            }
        },
    },
};
```
