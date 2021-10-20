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
	<title>Settings</title>
</svelte:head>

<div class="flex h-screen justify-center items-center ">
	<div class="grid-col-1 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
		<div class="flex items-center mb-6">
			<h1 class="text-4xl flex-1 text-right" >Settings for:&#32</h1>
			<span class="text-gray-700 flex-1 text-3xl justify-self">  {$session.user.username}</span>
		</div>
		<div class="flex gap-2">
			<button on:click={restrictedContent} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Restricted Content to Console.Log</button>
			<button on:click={logout} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Logout</button>
		</div>
	</div>

</div>
	{#if errors}
	 <div>
		 <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md" role="alert">
			 <strong class="font-bold">:c</strong>
			 <span class="block sm:inline">{JSON.stringify(errors)}</span>
			 <span class="absolute top-0 bottom-0 right-0 px-4 py-3" on:click={() => errors = null}>
			   <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
			 </span>
		   </div>
	 </div>
	
	{/if}