<script>
  import { variation } from "$lib/store";
  import { Card, Pagination } from "$comp";
  import { onMount, tick } from "svelte";

  export let filtered;
  export let total;
  export let loadMore;

  let currentPage = 0;
</script>

<Pagination bind:current={currentPage} {loadMore} {total} />

<div>
  <div class="sm:grid sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
    {#each filtered as artwork, i}
      {#if artwork}
        <div
        class="market-gallery w-full mb-20">
          <Card {artwork} />
        </div>
      {/if}
    {/each}
  </div>
</div>

<Pagination bind:current={currentPage} {loadMore} {total} scroll={true} />

<style>
  .market-gallery :global(.card-link img),
  .market-gallery :global(.card-link video) {
    height: 350px;
  }

</style>