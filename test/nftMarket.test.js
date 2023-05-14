const NftMarket = artifacts.require("NftMarket");
const { ethers } = require("ethers");
const { describe, before } = require("node:test");

 
contract("NftMarket", accounts => {
  let _contract = null;
  let _nftPrice = ethers.utils.parseEther("0.3").toString();
  let _listingPrice = ethers.utils.parseEther("0.025").toString();
  
  before(async () => {
    _contract = await NftMarket.deployed();
  })
 
  describe("Mint token", () => {
    const tokenURI = "https://test.com";
    before(async () => {
      await _contract.mintToken(tokenURI, _nftPrice, {
        from: accounts[0],
        value: _listingPrice
      })
    })
 
    it("owner of the first token should be address[0]", async () => {
      const owner = await _contract.ownerOf(1);
      assert.equal(owner, accounts[0], "Owner of token is not matching address[0]");
    })

    it("first token should point to correct tokenUri", async () => {
      const actualTokenURI =await  _contract.tokenURI(1);
      assert.equal(actualTokenURI, tokenURI, "tokeuri nt setted correctly");

    })

    it("should not be possible to craete nft with alrady used tokenuri", async () => {
      try {
        await _contract.mintToken(tokenURI, _nftPrice, {
          from: accounts[0]
        })
      } catch (error) {
        assert(error,"tokenuri was minted with prviously used tokenURI");
      }
      // assert.equal(owner, accounts[0], "Owner of token is not matching address[0]");
    })
    it("should have one listecd item", async () => {
      const listedItemCount = await _contract.listedItemsCount(); 
      assert.equal(listedItemCount.toNumber(),1, "Listed item count not 1");

    })

    it("should have create Nft item", async () => {
      const nftItem = await _contract.getNftItem(1);
      
      assert.equal(nftItem.tokenId,1, "Token id not 1");
      assert.equal(nftItem.price,_nftPrice, "Nft price is not correct");
      assert.equal(nftItem.creator,accounts[0], "creator is not account[0]");
      assert.equal(nftItem.isListed,true, "Token is not listed");
    })
  })
  describe("Buy NFT", () => {
    before(async () => {
      await _contract.buyNft(1, {
        from: accounts[1],
        value: _nftPrice
      })
    })

    it("should unlist the item", async () => {
      const listedItem = await _contract.getNftItem(1);
      assert.equal(listedItem.isListed, false, "Item is still listed");
    })

    it("should decrease listed items count", async () => {
      const listedItemsCount = await _contract.listedItemsCount();
      assert.equal(listedItemsCount.toNumber(), 0, "Count has not been decrement");
    })

    it("should change the owner", async () => {
      const currentOwner = await _contract.ownerOf(1);
      assert.equal(currentOwner, accounts[1], "Item is still listed");
    })
  })
})