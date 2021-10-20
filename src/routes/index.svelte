<script context="module">
	export async function load({ session }) {
		//If logged you can't access this page
 		if (session.user.username) {
			return {
				status: 302,
				redirect: '/settings'
			};
		} 
		return {};
	}
</script>

<script>
	import { session } from '$app/stores';
	import { post } from '$lib/utils.js';
	import { goto } from '$app/navigation';



	let username = '';
	let password = '';
	let errors = null;

	async function submit(event) {
		try{
			const response = await post(`auth/login`, { username, password });

		errors = response.error? response.error : null;

		if (response.username) {
			$session.user = {"username": response.username};
			goto('/settings')
		}
		}catch(err){
            console.log(JSON.stringify(err));
			errors = err;
		}
		
	}
  
</script>

<svelte:head>
	<title>Sign in</title>
</svelte:head>
<div class="flex h-screen justify-center items-center ">
	<div class='grid-col-1'>
		<div class="w-full max-w-xs ">
			<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"  on:submit|preventDefault={submit} >
				<h1 class='text-xl text-center'>Sign In</h1>
			  <div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="username">
				  Username
				</label>
				<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"   required placeholder="user" bind:value={username}>
			  </div>
			  <div class="mb-6">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="password">
				  Password
				</label>
				<input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" required placeholder="Password" bind:value={password}>
				<p class="text-red-500 text-xs italic">Please choose a password.</p>
			  </div>
			  <div class="flex items-center justify-between">
				<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
				  Sign In
				</button>
			  </div>
			</form>
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
	</div>


</div>
