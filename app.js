const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c599114a1emsh1142a01581c3d5ap1676dfjsndc89f719989b',
		'X-RapidAPI-Host': 'live-crypto-prices.p.rapidapi.com'
	}
};
let cryptos;
let query;

fetch('https://live-crypto-prices.p.rapidapi.com/pricefeed', options)
	.then(response => response.json())
	//.then((res) => console.log(res))
	.then(cryptoRaw => cryptoRaw.result)
	
	.then((cryptoRaw) => {
		
		cryptos = cryptoRaw.map((crypto) => {
			return {
				Logo: crypto.Logo,
				CoinName: crypto.CoinName,
				Id: crypto.Id,
				Price: crypto.Price,
				Volume24h: crypto.Volume24h,
				
			};
			
		})
		renderCryptoList(cryptos)
		
	
	});

	const filterCrypto = () => {
		const filteredCrypto = cryptos.filter((crypto) => {
			return (
				crypto.CoinName.toLowerCase().includes(query)
			);
		});
		renderCryptoList(filteredCrypto)
	};
	document.querySelector('#query').addEventListener('input', (e) => {
		
		query = e.target.value.toLowerCase().trim();
		console.log(query);
		filterCrypto();
	});

	const createInfoElement = (labelName,value) => {
		const infoElement = document.createElement('div');
		const labelElement = document.createElement('strong');
		const valueElement = document.createElement('span');

		labelElement.innerText = labelName;
		valueElement.innerText = value;
		infoElement.appendChild(labelElement);
		infoElement.appendChild(valueElement);
		return infoElement;
	}

	const createIMG = (crypto) => {
		const containerIMG = document.createElement('div');
		const createImgCrypto = document.createElement('img');
		createImgCrypto.src = crypto.Logo
		containerIMG.appendChild(createImgCrypto);
		createImgCrypto.width = 25;
		createImgCrypto.height = 25;
		return containerIMG;
	}



	const createCryptoItemElement = (x) => {
		const cryptoElement = document.createElement('li');
		
		const cryptoId = document.createElement('strong');
		cryptoElement.appendChild(createIMG(x));
		cryptoElement.appendChild(createInfoElement('Rank:  ', x.Id))
		cryptoElement.appendChild(createInfoElement('Name:  ', x.CoinName))
		cryptoElement.appendChild(createInfoElement('Price:  ', x.Price))
		cryptoElement.appendChild(createInfoElement('Volume 24h:  ', x.Volume24h))
		
		return cryptoElement;
	}

	



	const createListElement = (cryptos) => {
		const listElement = document.createElement('ul');
		cryptos.forEach((crypto) => {
			listElement.appendChild(createCryptoItemElement(crypto))
			
		});
		return listElement;
	}


	const renderCryptoList = (x) => {
		const rootElement = document.querySelector('#root');
		rootElement.innerHTML = '';
		rootElement.appendChild(createListElement(x));
	};

	console.log(Date);