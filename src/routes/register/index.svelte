<script>
  import { page } from "$app/stores";
  import { register } from "$lib/auth";

  let username = "anon";
  let password = "liquidart";

  let ref;
  let pageChange = () => setTimeout(() => ref.select(), 50);
  $: if (ref) pageChange($page);
</script>

<style>
  .form-container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .form-container form {
    width: 100%;
    max-width: 450px;
    background-color: white;
    padding: 40px;
    box-shadow: 0 1px 5px rgb(0 0 0 / 18%);
    border-radius: 10px;
  }

  input {
    @apply appearance-none border rounded py-4 px-3 text-gray-700 leading-tight;
  }

  span {
    cursor: pointer;
  }

  @media only screen and (max-width: 640px) {
    .form-container {
      background: none;
      height: auto;
    }

    .form-container form {
      box-shadow: none;
      padding: 0.2rem;
      margin-top: 50px;
    }
  }
</style>

<div class="form-container bg-lightblue">
  <form
    class="mb-6"
    on:submit|preventDefault={() => register(username, password)}
    autocomplete="off">
    <h2 class="mb-8">Sign up</h2>
    <div class="flex flex-col mb-4">
      <label class="mb-2 font-medium text-gray-600" for="first_name">Email or
        username</label>
      <input placeholder="username" bind:value={username} bind:this={ref} />
    </div>
    <div class="flex flex-col mb-4">
      <label
        class="mb-2 font-medium text-gray-600"
        for="last_name">Password</label>
      <input placeholder="At least 8 characters." type="password" bind:value={password} />
    </div>
    <span
      class="block w-full">By signing up, you agree to the <a href="/terms-and-conditions" class="text-midblue">Terms and Conditions</a> and <a href="/privacy-policy" class="text-midblue">Privacy Policy</a></span>
    <div class="flex my-5 justify-end">
      <button class="primary-btn w-1/2" type="submit">Register</button>
    </div>
  </form>
</div>