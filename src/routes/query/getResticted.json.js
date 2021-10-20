import { client } from '$lib/utilities/apolloClient.js'
import { gql } from '@apollo/client/core/core.cjs.js'
import { respond } from '$lib/utilities/_respond.js'

/*
	Very stupid endpoint please change/remove!!
	This is just to have it be a quick set up on the back end to get testing private data out of the database.
 */
export async function get ({ locals }) {
  try {
    const usersWhere = { username: locals.user.username }
    const query = gql`
        query Query($usersWhere: UserWhere) {
            users(where: $usersWhere) {
              password
            }
          }
		`
    const connection = new client(locals.user.token).client
    const { data } = await connection.query({
      query,
      variables: { usersWhere }
    })
    return {
      body: data.users[0]
    }
  } catch (err) {
    console.error('Error: ', JSON.stringify(err))
    const errors = {
      status: 500,
      error_detail: err
    }
    return respond({ error: errors })
  };
}
