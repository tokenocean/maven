<script>
  import { Avatar, Search } from "$comp";
  import { show, user, token } from "$lib/store";

  export let open = false;
  let toggle = () => (open = !open);

  let dropdown;
  let showDropdown = () => (dropdown = true);
  let hideDropdown = () => (dropdown = false);

</script>

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

<div
  class="flex justify-between items-center menu relative"
  on:mouseout={hideDropdown}
  on:blur={hideDropdown}>
  <Search />
  <a
    href="https://maven.tokenocean.io/"
    style="color: #83e68d"><button>Home</button></a>
  <a
    href="https://maven.tokenocean.io/marketplace"
    style="color: #83e68d"><button>Marketplace</button></a>
  <a
    href="https://maven.tokenocean.io/about-us"
    style="color: #83e68d"><button>About</button></a>
  <a
    href="https://maven.tokenocean.io/what-is-an-nft"
    style="color: #83e68d"><button>What's an NFT?</button></a>
  <a
    href="https://maven.tokenocean.io/contact"
    style="color: #83e68d"><button>Contact</button></a>
  {#if $user}
    {#if $user.is_admin}<a href="/admin"><button>Admin</button></a>{/if}
    <a href={`/${$user.username}`}>
      <button class="flex">
        <Avatar user={$user} />
      </button></a>
  {:else}
    <a href="/login" style="color: #83e68d"><button>Sign In</button></a>
  {/if}
</div>
