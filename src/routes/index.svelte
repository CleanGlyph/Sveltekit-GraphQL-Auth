<script context="module">
	export async function load({ session }) {
		
/* 		if (session.user) {
			return {
				status: 302,
				redirect: '/'
			};
		} */
		return {};
	}
</script>

<script>
	import { session } from '$app/stores';
	import { post } from '$lib/utils.js';



	let username = '';
	let password = '';
	let errors = null;

	async function submit(event) {
		try{
			const response = await post(`auth/login`, { username, password });

		errors = response.error? JSON.stringify(response.error) : null;

		if (response.username) {
			$session.user = {"username": response.username};
		}
		}catch(err){
            console.log(JSON.stringify(err));
			errors = err;
		}
		
	}
    async function restrictedContent(event) {
		try{
			const response = await fetch(`query/getResticted.json`).then((r) => r.json());


		//if(!response.ok) errors = response.status
		errors = response.error? JSON.stringify(response.error) : null;

		if (response) {
			console.log(response);
		}
		}catch(err){
            console.log(JSON.stringify(err))
			errors = err;
		}
		
	}
</script>

<svelte:head>
	<title>Sign in</title>
</svelte:head>

	<div >
			<div >
				<h1 >Sign In</h1>
                {JSON.stringify($session.user)}

				<form on:submit|preventDefault={submit} >
						<input  required placeholder="user" bind:value={username}>
						<input  type="password" required placeholder="Password" bind:value={password}>
					<button  type="submit">
						Sign in
					</button>
				</form>
			</div>
            <button on:click={restrictedContent}>Restricted Content to Console.Log</button>
            <a href="/query">Page with login redirect</a>
            <a href="/settings">User settings (a place to Log Out)</a>
	</div>

    {errors}
