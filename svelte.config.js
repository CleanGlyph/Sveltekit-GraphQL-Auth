import preprocess from 'svelte-preprocess'
/** @type {import('@sveltejs/kit').Config} */

// TODO find a way to include in roll up there is more debug info on 'dev'
// import invariantPlugin from "rollup-plugin-invariant";
const config = {
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte'
    vite: {  
      optimizeDeps: {
        include: [
          '@apollo/client/core',
          '@apollo/client/cache',
          '@apollo/client/link/ws',
          '@apollo/client/link/context',
          '@apollo/client/link/error',
          '@apollo/client/utilities'
        ],
        exclude: ['@apollo/client']
    },
  }
  },

  preprocess: [preprocess({
    postcss: true
  })]
}

export default config
