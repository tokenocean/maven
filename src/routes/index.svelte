<script>
  import HomePageLink from "$components/HomePageLink.svelte";
</script>

<style>
  .header {
    width: 90%;
    margin-top: 128px;
  }

  .header .primary-btn {
    width: 240px;
    margin: 0 auto;
  }

  .header h5 {
    font-size: 22px;
    line-height: 36px;
    color: #ffc43b;
    margin-top: 24px;
    margin-bottom: 34px;
  }

  .secondary-header {
    height: 600px !important;
    width: 100%;
    object-fit: cover;
  }

  .blur-bg {
    display: flex;
    padding: 60px;
    flex-direction: column;
    background: rgba(54, 58, 74, 0.45);
    backdrop-filter: blur(30px);
    box-shadow: 2px 2px 4px 0 rgb(0 0 0 / 10%);
    border-radius: 8px;
    color: white;
    width: 50%;
    width: fit-content;
  }

  .blur-bg h2 {
    color: white !important;
  }

  .blur-bg p {
    color: white !important;
    margin-top: 20px;
  }

  .header-button {
    width: 200px;
    border: 1px solid;
    border-radius: 30px;
    padding: 0.7rem 1.5rem !important;
  }

  @media only screen and (max-width: 768px) {
    .header {
      margin-top: 64px;
    }

    .header h5 {
      margin-top: 24px;
      margin-bottom: 24px;
    }

    .header .primary-btn {
      width: 100%;
    }

    .secondary-header {
      height: 400px !important;
    }

    .blur-bg {
      padding: 24px;
      width: 75%;
      width: fit-content;
    }
  }

</style>

<div class="flex header-container mx-auto justify-center">
  <div class="header text-center">
    <h2 class="text-left md:text-center md:w-full">
      The Future of NFTs is here!
    </h2>

    <h5 class="md:max-w-lg mx-auto text-left md:text-center">
      Invest in decentralized Asset based NFTs.
    </h5>
    <div class="flex w-full mb-10">
      <div
        class="mx-auto flex flex-wrap text-center justify-center lg:space-x-20">
        <HomePageLink
          url="/agriculture"
          title="Agriculture"
          img="/agriculture.png" />
        <HomePageLink
          url="/real-estate"
          title="Real Estate"
          img="/realestate.png" />
        <HomePageLink url="/music" title="Music" img="/music.png" />
        <HomePageLink url="/vehicles" title="Vehicles" img="/vehicles.png" />
      </div>
    </div>
    <a
      class="primary-btn hover:border-white hover:border-2"
      href={`/agriculture`}>Get started</a>
  </div>
</div>
