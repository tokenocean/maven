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
