const instance = await NftMarket.deployed();

instance.mintToken("https://gateway.pinata.cloud/ipfs/Qmb4aom5xNRE5CBRHZsxCsYSdcmX8zfHXgM7ovZxLp3CqL","500000000000000000", {value: "25000000000000000",from: accounts[0]})
instance.mintToken("https://gateway.pinata.cloud/ipfs/QmfLmdeRnuDcfK4A4vpLitcTGNfWqHru23PuBvDwfXKftJ","300000000000000000", {value: "25000000000000000",from: accounts[0]})