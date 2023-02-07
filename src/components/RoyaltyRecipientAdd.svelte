<script>
  import { createEventDispatcher } from "svelte";
  import { royaltyRecipientIndividualType, err } from "$lib/utils";
  import Fa from "svelte-fa";
  import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
  const dispatch = createEventDispatcher();

  export let defaultName;
  export let defaultAddress;
  
  let oneTimeRoyaltyEnabled = false;

  const recipientModel = {
    name: "",
    amount: 1,
    address: "",
    type: royaltyRecipientIndividualType,
    one_time_payment: false
  };

  let recipient = {
    ...recipientModel,
    ...{ address: defaultAddress, name: defaultName },
  };

  const handleOneTimeRoyalty = () => {
    if (!oneTimeRoyaltyEnabled) {
      recipient.one_time_payment = true;
      oneTimeRoyaltyEnabled = true;
    } else {
      recipient.one_time_payment = false;
      oneTimeRoyaltyEnabled = false;
    }
  }

  const onSubmit = (e) => {
    if (!recipient.name.length)
      return err("Please enter a name for the recipient.");
    if (recipient.amount <= 0)
      return err("Please enter an amount percentage for the recipient.");
    if (!recipient.address)
      return err("Please enter an address for the recipient.");

    dispatch("addrecipient", {
      newRecipient: recipient,
      cb: () => {
        recipient = { ...recipientModel };
      },
    });
    oneTimeRoyaltyEnabled = false;
  };

</script>



<form
  class="w-full mb-6 mt-6"
  autocomplete="off"
  on:submit|preventDefault={onSubmit}>
  <div class="flex flex-wrap w-full mb-4">
    <div class="mt-1 rounded-md md:w-4/5 w-full md:pr-6">
      <label for="recipientName">Name</label>
      <input
        class="form-input block w-full pl-4 pr-4"
        type="text"
        bind:value={recipient.name}
        placeholder="Recipient Name"
        id="recipientName" />
    </div>
    <div class="mt-1 rounded-md md:w-1/5 w-1/2">
      <label for="recipientAmount">Rate (%)</label>
      <input
        class="form-input block w-full pl-4 pr-1"
        type="number"
        step="1"
        min="1"
        bind:value={recipient.amount}
        placeholder="Amount Percent"
        id="recipientAmount" />
    </div>
  </div>
  <div class="flex w-full sm:w-3/4 mb-4">
    <div class="relative mt-1 rounded-md w-2/3 mr-6">
      <div class="auction-toggle">
        <label class="inline-flex items-center">
          <input
            class="form-checkbox h-6 w-6 mt-3"
            type="checkbox"
            bind:checked={oneTimeRoyaltyEnabled} 
            on:click={handleOneTimeRoyalty}
          />
          <span class="ml-3 text-xl">One Time Payment</span>
          <span class="tooltip">
            <i class="ml-3 text-midblue text-xl tooltip">
              <Fa icon={faQuestionCircle} pull="right" class="mt-1" />
            </i>
            <span
              class="tooltip-text text-black bg-gray-100 shadow ml-4 rounded"
            >
              Setting a One Time Payment means 
              original sale would have a single payment disbursement 
              and no following payments.
            </span>
          </span>
        </label>
      </div>
    </div>
  </div>
  <div class="flex w-full mb-4">
    <div class="mt-1 rounded-md w-4/5 pr-6">
      <label for="recipientAddress">Address</label>
      <input
        class="form-input block w-full pl-4 pr-4"
        type="text"
        bind:value={recipient.address}
        placeholder="Recipient Address"
        id="recipientAddress" />
    </div>
    <div class="mt-1 rounded-md w-1/5 pt-8">
      <input
        type="submit"
        class="primary-btn btn-sm cursor-pointer mx-auto"
        value="Add Recipient" />
    </div>
  </div>
</form>


<style>
  input[type="submit"] {
    height: 54px;
    font-size: 0.9rem;
  }

  input {
    @apply rounded-lg mb-4 mt-2;
    &:disabled {
      @apply bg-gray-100;
    }
  }

  .tooltip {
    cursor: pointer;
  }
  .tooltip .tooltip-text {
    visibility: hidden;
    padding: 15px;
    position: absolute;
    z-index: 100;
    width: 300px;
    font-style: normal;
  }
  .tooltip:hover .tooltip-text {
    visibility: visible;
  }

  input[type="checkbox"]:checked {
    appearance: none;
    border: 5px solid #fff;
    outline: 2px solid #6ed8e0;
    background-color: #6ed8e0;
    padding: 2px;
    border-radius: 0;
  }

  @media only screen and (max-width: 768px) {
    .container {
      background: none;
    }
    .tooltip .tooltip-text {
      width: 100%;
      left: 0px;
      top: 30px;
    }
  }
</style>