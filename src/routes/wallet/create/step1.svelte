<script>
  import { goto } from "$lib/utils";
  import Fa from "svelte-fa";
  import {
    faLock,
    faStickyNote,
    faWallet,
  } from "@fortawesome/free-solid-svg-icons";

</script>

<style>
  li {
    margin-bottom: 30px;
  }
  li span {
    margin-left: 20px;
  }

</style>

<div class="w-full px-5 md:px-0">
  <p class="text-xl mb-10">
    You"ll be given a random backup phrase that is essential to restore your
    wallet.
  </p>

  <ul class="flex flex-col mb-10">
    <li class="flex">
      <i class="text-lightblue">
        <Fa icon={faStickyNote} /></i>
      <span class="-mt-1">Write on actual paper instead of keeping it in a
        digital format in your device.</span>
    </li>
    <li class="flex">
      <i class="text-lightblue">
        <Fa icon={faLock} />
      </i>
      <span class="-mt-1">Wait until you are on a personal device and in a
        private environment.</span>
    </li>
  </ul>

  <a href="/wallet/create/step2" class="primary-btn w-full">I'm ready to start</a>
</div>
