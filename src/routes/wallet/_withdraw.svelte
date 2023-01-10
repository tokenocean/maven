<script>
import { query } from "$lib/api";
  import { tick } from "svelte";
  import Fa from "svelte-fa";
  import { newapi as api } from "$lib/api";
  import { fiat, user, psbt, bitcoinUnitLocal, fiatRates } from "$lib/store";
  import { broadcast, pay, keypair, requestSignature } from "$lib/wallet";
  import { btc, dev, err, info, sats, val, ticker } from "$lib/utils";
  import sign from "$lib/sign";
  import {
    faUserSecret,
    faChevronUp,
    faChevronDown,
    faTimes,
  } from "@fortawesome/free-solid-svg-icons";
  import { ProgressLinear, Fiat } from "$comp";
  import { requirePassword } from "$lib/auth";
  import { getArtworkByAsset } from "$queries/artworks";
  import bolt11 from "bolt11";

  export let asset;
  export let withdrawing = false;
  let tab = "liquid";
  let amount;
  let showAmount = true;

  $: unitCalculated = $bitcoinUnitLocal === "sats" ? "L-sats" : "L-BTC";

  $: fiatAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: $user ? $user.fiat : $fiat,
    signDisplay: "never",
  }).format(
    (amount
      ? unitCalculated === "L-sats"
        ? amount
        : ticker(asset) === "L-BTC"
        ? amount * 100000000
        : 0
      : 0) *
      ($fiatRates[$user ? $user.fiat : $fiat] / 100000000)
  );

  let to = dev
    ? "AzppkpkTHBGfGcvU89AKH9JNuoe24LZvjbNCDStpykLLUj2S3n3zPFPVhQCiC8akswapzRrEqHnJUmMQ"
    : "";

  let loading;
  let artwork;
  $: lightningInvoice = "";

  let decode = (invoice) => {
    let decodedInvoice = bolt11.decode(invoice);

    if (decodedInvoice.millisatoshis) {
      showAmount = false;
    }
    amount = decodedInvoice.millisatoshis / 100000000000;
    return decodedInvoice;
  };

  let bitcoin = async () => {
    tab = "bitcoin";
  };

  let liquid = async () => {
    tab = "liquid";
  };

  let lightning = async () => {
    tab = "lightning";
  };

  $: updateAsset(asset);
  let updateAsset = (asset) =>
    asset &&
    query(getArtworkByAsset, { asset })
      .then(({ artworks }) => (artwork = artworks[0]))
      .catch(err);

  $: clearForm(asset);
  let clearForm = () => {
    amount = undefined;
  };

  let send = async (e) => {
    let id;
    await requirePassword();
    loading = true;
    if (tab === "lightning") {
      address = $user.address;
      try {
        ({ address: to, id } = await api().url("/invoice").post().json());
      } catch (e) {
        console.log(e);
        err(e);
      }

      try {
        await api()
          .url("/conversion")
          .post({
            invoice_id: id,
            text: lightningInvoice,
          })
          .json();
      } catch (e) {
        err(e);
      }
    }
    try {
      if (asset !== btc && !artwork) artwork = { asset };
      $psbt = await pay(
        artwork,
        to.trim(),
        sats(
          asset,
          asset === btc && $bitcoinUnitLocal === "sats"
            ? amount / 100000000
            : amount
        )
      );
      $psbt = await sign();

      if (artwork?.held === "multisig") {
        $psbt = await requestSignature($psbt);
      }

      await broadcast();

      info("Payment sent!");

      await api().url("/mail-withdrawal").post({
        amount,
        units: $bitcoinUnitLocal
      });

      withdrawing = false;
    } catch (e) {
      console.log(e);
      err(e);
    }
    loading = false;
  };
  let address;
</script>

{#if $user && withdrawing}
  <form
    class="dark-bg md:rounded-lg p-5 w-full flex flex-col mb-8"
    on:submit|preventDefault={send}
    autocomplete="off"
  >
    {#if loading}
      <ProgressLinear />
    {:else}
      <div class="flex justify-between place-items-center text-gray-400">
        <p>Withdraw Wallet</p>
        <button
          class="text-gray-400 text-xl w-auto"
          on:click={() => (withdrawing = false)}
        >
          <Fa icon={faTimes} />
        </button>
      </div>
      {#if asset === btc}
        <div
          class="flex justify-center text-center cursor-pointer tabs flex-wrap mb-2"
        >
          <div class:hover={tab === "liquid"} on:click={liquid}>Liquid</div>
          <div class:hover={tab === "bitcoin"} on:click={bitcoin}>Bitcoin</div>
          <div class:hover={tab === "lightning"} on:click={lightning}>
            Lightning
          </div>
        </div>
      {/if}
      <div class="flex flex-col mb-4">
        {#if showAmount}
          <label for="amount">Amount</label>
          <div class="flex relative justify-between text-black">
            <input
              id="amount"
              class="w-full"
              placeholder={val(asset, 0)}
              bind:value={amount}
            />
            {#if ticker(asset) === "L-BTC"}
              <div class="absolute top-[17px] right-2">
                {unitCalculated}
              </div>
            {/if}
          </div>
        {:else}
          <label for="amount">Amount</label>
          <div class="flex relative justify-between text-black">
            <input
              id="amount"
              class="w-full"
              placeholder={val(asset, 0)}
              bind:value={amount}
              disabled
            />
            {#if ticker(asset) === "L-BTC"}
              <div class="absolute top-[17px] right-2">
                {unitCalculated}
              </div>
            {/if}
          </div>
        {/if}
        {#if ticker(asset) !== "L-CAD" && ticker(asset) !== "L-USDt"}
          <div class="flex justify-end">
            <Fiat amount={fiatAmount} />
          </div>
        {/if}
      </div>
      {#if tab === "lightning"}
        <div class="flex flex-col mb-4">
          <label for="address">Lightning Invoice</label>
          <textarea
            id="address"
            style="overflow:auto"
            placeholder="Invoice"
            bind:value={lightningInvoice}
            on:input={() => decode(lightningInvoice)}
            rows={4}
          />
        </div>
      {:else}
        <div class="flex flex-col mb-4">
          <label for="address">Recipient Address</label>
          <textarea
            id="address"
            style="overflow:auto"
            placeholder="Address"
            bind:value={to}
            rows={4}
          />
        </div>
      {/if}
      <button type="submit" class="primary-btn w-full mt-5"
        >Complete withdraw</button
      >
    {/if}
  </form>
{/if}

<style>
  .hover {
    @apply border-b-2;
    border-bottom: 3px solid #6ed8e0;
  }

  .tabs div {
    @apply mb-auto h-8 mx-2 md:mx-4 mt-6;
    &:hover {
      @apply border-b-2;
      border-bottom: 3px solid #6ed8e0;
    }
  }

  textarea,
  input,
  select {
    @apply rounded-lg p-2 text-white;
    margin-top: 10px;
  }
</style>
