<script context="module">
    export async function load({ session }) {
        if (!session.user.username) {
            return {
                status: 302,
                redirect: "/",
            };
        }
        //Leave this return or your page will be 404 only when logged in (lol)
        return {};
    }
</script>

<script>
    let errors = null;
    async function restrictedContent() {
        try {
            const response = await fetch(`query/getResticted.json`).then((r) =>
                r.json()
            );
            errors = response.error ? JSON.stringify(response.error) : null;

            if (response) {
                return response;
            }
        } catch (err) {
            console.log(JSON.stringify(err));
            return err;
        }
    }
    let promise = restrictedContent();
</script>

<svelte:head>
    <title>Insecure Secure Page</title>
</svelte:head>
<div class="flex h-screen justify-center items-center ">
    <div class="grid-col-1 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg">
        <div class="flex items-center mb-6">
            <h1 class="text-2xl flex-1 text-center">
               Showing this user's password for an example of dumb ways to show case ristricted pages
            </h1>
        </div>
        {#await promise}
            <p >one sec figuring it out.....</p>
        {:then data}
            <p class="break-all">
                Cause <span class="font-semibold">I assume you'll change this:</span> <span class=" font-bold text-yellow-500">{data.password}</span> unless your just starting to use the neo4j template aswell and haven't seen this far yet
                use case if your using the neo4j template aswell 
            </p>
        {:catch error}
  
        <div>
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md" role="alert">
                <strong class="font-bold">:c</strong>
                <span class="block sm:inline">{JSON.stringify(error)}</span>
                <span class="absolute top-0 bottom-0 right-0 px-4 py-3" on:click={() => errors = null}>
                  <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
              </div>
        </div>
       
       
        {/await}
    </div>
</div>
