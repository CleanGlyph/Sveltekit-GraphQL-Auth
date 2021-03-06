import { Client } from '$lib/utilities/apolloClient.js'
import { gql } from '@apollo/client/core/'
/*
	Very stupid endpoint please change/remove!!
	This is just to have a quick set up to show you can get 'private' data out of the database.
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
    const connection = new Client(locals.user.token).client
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
    return { status: 401, body: { error: errors } }
  };
}
