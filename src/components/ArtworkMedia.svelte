<script>
  import { onMount } from "svelte";
  import Fa from "svelte-fa";
  import {
    faHeadphones,
    faFilePdf,
    faVolumeUp,
    faVolumeMute,
  } from "@fortawesome/free-solid-svg-icons";
  import { painting, variation, edition } from "$lib/store";

  export let artwork;
  export let showDetails;
  export let loaded = false;
  export let thumb = true;
  export let preview = false;
  export let popup = false;
  let img, vid, aud;
  let path;
  $: if (thumb && artwork.title.startsWith("Vida")) {
    if ($painting || $variation || $edition) {
      path = `/api/public/${artwork.filename}.mp4`;
    } else {
      path = `/api/public/${artwork.filename}.jpg`;
    }
  } else {
    path = `/api/ipfs/${artwork.filename}`;
  }

  $: cover = !showDetails;
  $: contain = showDetails;
  $: videoChanged(path);
  let videoChanged = (path) => {
    if (!vid) return;
    vid.load();
  };
  $: setLoaded(img, vid, aud);
  let setLoaded = (img, vid, aud) => {
    img &&
      (img.onload = () => {
        loaded = true;
      });

    vid &&
      (vid.onloadeddata = () => {
        loaded = true;
      });

    aud &&
      (aud.onerror = () => {
        loaded[artwork.id] = true;
      });
  };

  function hasAudio(v) {
    if (!v) return false;
    return (
      v.mozHasAudio ||
      Boolean(v.webkitAudioDecodedByteCount) ||
      Boolean(v.audioTracks && v.audioTracks.length)
    );
  }

  let loadVideo = () => {
    if (!vid) return;
    if ("IntersectionObserver" in window) {
      var lazyVideoObserver = new IntersectionObserver(function (
        entries,
        observer
      ) {
        entries.forEach(function (video) {
          if (video.isIntersecting) {
            for (var source in video.target.children) {
              var videoSource = video.target.children[source];
              if (
                typeof videoSource.tagName === "string" &&
                videoSource.tagName === "SOURCE"
              ) {
                videoSource.src = videoSource.dataset.src;
              }
            }

            video.target.load();
            video.target.classList.remove("lazy");
            lazyVideoObserver.unobserve(video.target);
          }
        });
      });

      lazyVideoObserver.observe(vid);
    }
  };

  onMount(loadVideo);
  $: loadVideo(preview);
  $: reloadVideo(artwork);
  let reloadVideo = () => (vid && vid.currentTime) || loadVideo();

  let muted = true;
  let invisible = true;

  let over = () => vid && hasAudio(vid) && (invisible = false);
  let out = () => (invisible = true);

  let toggleSound = () => {
    muted = !muted;
    vid.muted = muted;
  };

</script>

<style>
  .contain,
  .cover {
    width: 100%;
    position: relative;
  }

  .contain img,
  .contain video {
    height: 350px;
    width: 100%;
    object-fit: cover;
  }

  img,
  video {
    max-height: 70vh;
    @apply mx-auto;
  }

  video {
    width: auto;
  }

</style>

{#if artwork.filetype.includes('mp4') && !(thumb && artwork.title.startsWith('Vida') && !path.includes('mp4'))}
  <div
    class="w-full"
    class:inline-block={!popup}
    class:cover
    class:contain
    on:mouseover={over}
    on:focus={over}
    on:mouseout={out}
    on:blur={out}>
    <video
      class="lazy"
      autoplay
      muted
      playsinline
      loop
      bind:this={vid}
      controls={popup}>
      <source data-src={preview || path} src={preview || path} />
      Your browser does not support HTML5 video.
    </video>
    {#if !popup}
      <button
        class="absolute hidden md:block bottom-2 right-2 secondary-color"
        type="button"
        class:invisible
        on:click|stopPropagation|preventDefault={toggleSound}>
        <Fa icon={muted ? faVolumeMute : faVolumeUp} size="1.5x" />
      </button>
    {/if}
  </div>
{:else if artwork.filetype.includes('audio')}
  <div
    class="p-5 bg-primary/50 flex justify-center items-center h-full w-full mx-auto rounded-lg">
    <img src class="hidden" bind:this={aud} />
    <figure>
      <Fa icon={faHeadphones} class="mx-auto" size="3x" />
      <figcaption class="text-center">NFT audio file</figcaption>

      {#if noAudio === false}
        <audio class="mx-auto" controls src={preview || path}>
          Your browser does not support the
          <code>audio</code>
          element.
        </audio>
      {/if}
    </figure>
  </div>
{:else if artwork.filetype.includes('pdf')}
  <a href={path} download={artwork.slug + '.pdf'}>
    <div
      class="p-5 bg-primary/50 flex justify-center items-center h-full w-full mx-auto rounded-lg">
      <img src="/pdf.png" />
    </div>
  </a>
{:else}
  <div class="w-full" class:cover class:contain>
    <img
      src={preview || path ? path : '/liquid_logo.svg'}
      alt={artwork.title}
      loading="lazy"
      bind:this={img} />
  </div>
{/if}
