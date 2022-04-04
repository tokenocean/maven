<script context="module">
  export async function load({ error, status }) {
    console.log(error, status);
    return {
      props: {
        error,
      },
    };
  }

</script>

<script>
  export let error;

</script>

<div class="container mx-auto sm:justify-between mt-10 md:mt-20">
  <div class="mx-auto">
    <h2 class="mb-10">An error occurred</h2>
    <p>{error.message}</p>
    <a href="/"> <button class="primary-btn"> Return to homepage</button></a>
  </div>
</div>
