<script>
  import "../app.css";
  import { session } from "$app/stores";
</script>

<ul class="flex justify-center gap-6">
  {#if !$session.user.username}
    <li class="">
      <a class="text-blue-500 hover:text-blue-800 text-lg" href="/">Login</a>
    </li>
    <li class="">
      <a class="text-blue-500 hover:text-blue-800 text-lg" href="/query">Restricted</a>
    </li>
  {:else if $session.user.username}
    <li class="">
      <a class="text-blue-500 hover:text-blue-800 text-lg" href="/query">Restricted</a>
    </li>
    <li class="">
      <a class="text-blue-500 hover:text-blue-800 text-lg" href="/settings"
        >User Settings</a
      >
    </li>
  {/if}
</ul>
<slot />
