<script>
  import { Avatar, Search } from "$comp";
  import { show, token } from "$lib/store";
  import { session } from "$app/stores";
  import { unreadMessages, user } from "$lib/store";
  export let open = false;
  let toggle = () => (open = !open);

  let dropdown;
  let showDropdown = () => (dropdown = true);
  let hideDropdown = () => (dropdown = false);
</script>

<div
  class="flex justify-between items-center menu relative"
  on:mouseout={hideDropdown}
  on:blur={hideDropdown}
>
  <Search />
  <a href="https://www.mavennft.io/" style="color: #83e68d"
    ><button>Home</button></a
  >
  <a href="https://www.mavennft.io/about-us" style="color: #83e68d"
    ><button>About</button></a
  >
  <a href="https://www.mavennft.io/what-is-an-nft" style="color: #83e68d"
    ><button>What's an NFT?</button></a
  >
  <a href="https://www.mavennft.io/contact" style="color: #83e68d"
    ><button>Contact</button></a
  >
  {#if $session.user}
    {#if $session.user.is_admin}<a href="/admin"><button>Admin</button></a>{/if}
    <a href={`/${$session.user.username}`}>
      <button class="flex">
        <Avatar user={$session.user} />
      </button></a
    >
    {#if $unreadMessages.length > 0}
      <div
        class="absolute top-0 right-2 bg-primary rounded-full cursor-default px-2 font-bold text-xs"
      >
        {$unreadMessages.length}
      </div>
    {/if}
  {:else}
    <a href="/login" style="color: #83e68d"><button>Sign In</button></a>
  {/if}
</div>

<style>
  .menu button {
    width: auto;
    text-align: left;
    padding: 0 20px;
  }

  .menu :global(.search) {
    border: 1px solid lightgray;
    border-radius: 30px;
    margin-right: 15px;
    width: 250px;
  }

  .menu :global(.search):focus-within {
    border: 1px solid #5c5d60;
    border-radius: 30px;
  }

  .menu :global(input) {
    width: auto;
    width: 80%;
    border: none;
    background: none;
    padding: 0.5rem 1.2rem;
  }

  .menu :global(.fa-search) {
    font-size: 1.2rem;
  }

  @media only screen and (max-width: 1023px) {
    .menu :global(.search) {
      display: none;
    }
  }

  @media only screen and (max-width: 1023px) {
    .menu {
      flex-direction: column;
      align-items: flex-start;
      margin-top: 80px;
      width: 100%;
    }

    .menu a {
      margin: 25px 0 0 0px;
      width: 100%;
    }
  }
</style>
