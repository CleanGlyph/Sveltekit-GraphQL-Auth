<script context="module">
    export async function load({ session }) {
        if (!session.user.username) {
            return {
                status: 302,
                redirect: "/",
            };
        }
        //Leave this return or your page will be 404 only when logged in (lol)
        return {}
    }
</script>

<script>
    let errors = null;
     async function restrictedContent() {
		try{
		const response = await fetch(`query/getResticted.json`).then((r) => r.json());
		errors = response.error? JSON.stringify(response.error) : null;

		if (response) {
			return(response);
		}
		}catch(err){
            console.log(JSON.stringify(err))
			return err
		}
	}
   let promise = restrictedContent();

</script>

<svelte:head>
    <title>Insecure Secure Page</title>
</svelte:head>

<div>
    <h1>Wow so you just showing passwords for a boiler plate</h1>
 
</div>
{#await promise}
	<p>well.....</p>
{:then data} 
	<p> 
        yea I assume you'll change {JSON.stringify(data.password)} for your actual
        use case, or be using demo users to test your backend as your setting this up.
    </p>
{:catch error}
    <h2>:c</h2>
	<p style="color: red"> {error.message}</p>
{/await}