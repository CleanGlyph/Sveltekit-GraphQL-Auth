/** @type {import('@sveltejs/kit').Config} */

//TODO find a way to include in roll up there is more debug info on 'dev'
//import invariantPlugin from "rollup-plugin-invariant";
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	},

};

export default config;
