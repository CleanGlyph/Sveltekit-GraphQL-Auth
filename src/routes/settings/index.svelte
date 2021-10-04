<script context="module">
	export async function load({ session }) {
		if (!session.user.username) {
			return {
				status: 302,
				redirect: '/'
			};
		} 
		return {};
	}
</script>

<script>
	import { session } from '$app/stores';

	import { goto } from '$app/navigation';

	let errors = null;
	
    async function logout(event) {
		try{
			const response = await fetch(`auth/logout`,
			{method: 'POST'}).then((r) => r.json());


		errors = response.error? JSON.stringify(response.error) : null;

		if (response) {
			/*
			Set user to null:
				1. It not being null is a check for redirects
				2. Session is preserved in redirect so a uesr dat would be kept regardless of removing the cookie
			Then send to '/' once settings are purged
			*/
			$session.user = {};
			goto('/');
		}
		}catch(err){
            console.log(JSON.stringify(err));
			errors = err;
			$session.user = null;
			goto('/');
		}
		
	}
</script>

<svelte:head>
	<title>Sign in</title>
</svelte:head>

	<div >
				<h1 >Settings</h1>
                {JSON.stringify($session.user)}
           <button on:click={logout}>Logout</button>
            <a href="/query">Page with login redirect</a>
            <a href="/">Home</a>
	</div>

    {errors}
