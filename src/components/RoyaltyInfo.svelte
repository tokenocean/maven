<script>
  import RoyaltyRecipient from "$components/RoyaltyRecipient.svelte";
  import Fa from "svelte-fa";
  import { faGem } from "@fortawesome/free-regular-svg-icons";
  import {
    faChevronUp,
    faChevronDown,
  } from "@fortawesome/free-solid-svg-icons";
  export let artwork, hideDetails;
  let show;
  let oneTimePayment = artwork.royalty_recipients.find(recipient => recipient.one_time_payment === true)
  console.log("HERE", oneTimePayment)
</script>

{#if artwork.royalty_recipients.length}
<div class="mb-6">
  <div class="text-xs cursor-pointer mb-2" on:click={() => (show = !show)}>
    <div class="flex">
      <i class="text-midblue text-xs mr-1 my-auto">
        <Fa icon={faGem} />
      </i>
      {#if oneTimePayment}
      <div class="my-auto">Payment Distribution</div>
      {:else}
      <div class="my-auto">Royalties</div>
      {/if}
      <div class="my-auto ml-1">
        <Fa icon={show ? faChevronUp : faChevronDown} />
      </div>
    </div>
  </div>
  {#if show}
    <ul>
        {#each artwork.royalty_recipients as recipient}
          <RoyaltyRecipient
            editable={false}
            askingAsset={artwork.asking_asset}
            {recipient}
            {hideDetails}
          />
        {/each}
    </ul>
  {/if}
</div>
      {/if}
