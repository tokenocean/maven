<script>
  import { user, token } from "$lib/store";
  import { createFavorite, deleteFavorite } from "$queries/favorites";
  import { requireLogin } from "$lib/auth";
  import { err } from "$lib/utils";
  import { query } from "$lib/api";

  import Fa from "svelte-fa";
  import { faHeart } from "@fortawesome/free-regular-svg-icons";
  import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

  export let artwork;

  let favorite = async () => {
    try {
      await requireLogin(null, $token);
      let { id: artwork_id } = artwork;
      let { id: user_id } = $user;

      if (artwork.favorited) {
        await query(deleteFavorite, { artwork_id, user_id });
        artwork.num_favorites--;
        artwork.favorited = false;
      } else {
        await query(createFavorite, { artwork_id });
        artwork.num_favorites++;
        artwork.favorited = true;
      }
    } catch (e) {
      err(e);
    }
  };
</script>

<div on:click={favorite} class:favorited={artwork.favorited}>
  <Fa icon={artwork.favorited ? solidHeart : faHeart} size="1.5x" />
</div>

<style>
  div:hover,
  .favorited {
    @apply text-primary cursor-pointer;
  }
</style>