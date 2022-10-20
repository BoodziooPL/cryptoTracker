const trust = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c599114a1emsh1142a01581c3d5ap1676dfjsndc89f719989b',
		'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
	}
};

fetch('https://coinranking1.p.rapidapi.com/stats?referenceCurrencyUuid=yhjMzLPhuIDl', trust)
	.then(response => response.json())
    .then((globalInfo) => {
    return { 
      mcap: globalInfo.data.totalMarketCap,
      volume: globalInfo.data.total24hVolume,
      coins: globalInfo.data.totalCoins,
    }
    
  })
  
  .then(globalInfo => added(globalInfo))
  

 
  const added = (globalInfo) => {
    // anchor all elements
   
    const mcaps = document.querySelector('.mCap')
    const volumes = document.querySelector('.volume')
    const coins = document.querySelector('.coins')
    // change number for num with comma
    function numberWithCommas(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
      let str = numberWithCommas(globalInfo.mcap)
      let volum = numberWithCommas(globalInfo.volume)
    //create div for store value
      const macap = document.createElement('div');
      const vol = document.createElement('div');
      const allCoins = document.createElement('div');
     // putting data to el.
      macap.innerHTML = ('$') +  str;
      vol.innerHTML = ('$') + volum;
      allCoins.innerHTML = globalInfo.coins;
//appending div to anchored el
    mcaps.appendChild(macap)
    volumes.appendChild(vol)
    coins.appendChild(allCoins)
}
