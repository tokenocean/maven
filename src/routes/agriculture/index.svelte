<script context="module">
  import { post } from "$lib/api";
  export async function load({ fetch }) {
    const r = await post("/artworks.json", {}, fetch).json();

    return {
      props: {
        count: r.total,
        initialArtworks: r.artworks,
      },
    };
  }

</script>

<script>
  import { onMount } from "svelte";
  import Fa from "svelte-fa";
  import {
    artworks,
    filterCriteria,
    results,
    show,
    sortCriteria,
    edition,
    painting,
    variation,
    token,
    user,
  } from "$lib/store";
  import { info, err, goto } from "$lib/utils";
  import { Gallery, Results, ProgressLinear, Search } from "$comp";
  import { requirePassword } from "$lib/auth";
  import { pub } from "$lib/api";

  export let count;
  export let initialArtworks = [];

  $artworks = initialArtworks;
  let filtered = initialArtworks;

  let offset = 0;

  $: filter($artworks, $painting, $variation, $edition);
  let filter = (a, p, v, e) => {
    if (!a) return;
    filtered = $artworks.filter(({ title }) => {
      let words = title.split(" ");
      let n = parseInt(words[words.length - 1]);
      if (!n) return false;
      if (!p) return n % 100 === 0;
      if (!v) return n <= p && n > p - 100 && n % 10 === 0;
      if (!e) return n <= v && n > v - 10;
    });
  };

  let back = () => {
    if ($edition) $edition = undefined;
    else if ($painting) $painting = undefined;
    else if ($variation) $variation = undefined;
  };

  onMount(async () => {
    $edition = undefined;
    $painting = undefined;
    $variation = undefined;
  });

</script>

<style>
  @media only screen and (max-width: 767px) {
    .primary-btn {
      width: 300px;
      text-align: center;
      margin: 0 auto;
      margin-bottom: 30px;
    }
  }

</style>

<Results />

<div
  class="container mx-auto flex flex-wrap flex-col-reverse md:flex-row sm:justify-between my-10 md:mt-20">
  <h2 class="md:mb-0">Agriculture</h2>
  {#if $user && $user.is_artist}
    <a href="/a/create" class="primary-btn">Mint a new asset</a>
  {/if}
  {#if $painting}
    <a href="/a/create" class="primary-btn" on:click|preventDefault={back}>Go
      back</a>
  {/if}
</div>

<div class="container mx-auto">
  <h3 class="mb-4">Harvest Shares</h3>
  <Gallery bind:filtered bind:count />
</div>
