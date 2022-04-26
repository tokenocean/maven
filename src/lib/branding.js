const BRANDING = {
  projectName: 'Maven',
  
  superUserName: 'maven',
  
  urls: {
    base: 'maven.tokenocean.io',
    www: 'maven.tokenocean.io',
    protocol: 'https://maven.tokenocean.io',
    external: {
      instagram: 'https://www.instagram.com/maven_nft/',
      twitter: 'https://twitter.com/maven_nft',
      telegram: 'https://t.me/maven_nft',
      blog: 'https://blog.maven.tokenocean.io/',
    }
  },
  
  meta: {
      title: 'Maven',
      keywords: "Bitcoin Asset Backed NFTs",
      description: "An asset backed NFT marketplace",
        image: 'https://maven.tokenocean.io/splash.png',
        url: 'https://maven.tokenocean.io/',

      twitter: {
        card: 'summary_large_image',
        creator: '@maven',
        site: '@maven',
      },
    
    artwork: (art) => ({
      title: `Maven - ${art.title}`,
      image: `/api/ipfs/${art.filename}`,
      url: `https://maven.tokenocean.io/a/${art.slug}`,
    })
    
  },
  
  emails: {
    support : 'support@maven.tokenocean.io'
  }
};

export default BRANDING;
