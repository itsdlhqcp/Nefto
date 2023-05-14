// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
//minted tokens are stored in piniata
import "@openzeppelin/contracts/utils/Counters.sol";

contract NftMarket is ERC721URIStorage {
  using Counters for Counters.Counter;

   //handling of multiple items instances
 struct NftItem {
  uint tokenId;
  uint price;
  address creator;
  bool isListed;
 }
//here unique ids are given to each listing items
 Counters.Counter private _listedItems;
 Counters.Counter private _tokenIds;

 mapping(string => bool) private _usedTokenURIs;
 mapping(uint => NftItem) private _idToNftItem;


  uint public listingPrice = 0.025 ether;

 //Listening the event
 event NftItemCreated (
   uint tokenId,
  uint price,
  address creator,
  bool isListed
 );
 
 

  constructor() ERC721("CreaturesNFT", "CNFT") {}

  
  function getNftItem(uint tokenId) public view returns (NftItem memory){
    return _idToNftItem[tokenId];
  }

  function listedItemsCount() public view returns (uint) {
    return _listedItems.current();
  }

  function tokenURIExists(string memory tokenURI) public view returns (bool) {
    return _usedTokenURIs[tokenURI] == true;
  }
  //this helps to increment the counts if id's
  function mintToken(string memory tokenURI, uint price) public payable returns (uint){
    require(!tokenURIExists(tokenURI), "Token URI already exists");
    require(msg.value == listingPrice, "Price must be equal to listing price");
    _tokenIds.increment();
    _listedItems.increment();
//minted token
    uint newTokenId = _tokenIds.current();
//MINTED TOKENS UPDATED VALUING FUNCTION -->AI Functioning
    _safeMint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, tokenURI);
    _createNftItem(newTokenId, price);
    _usedTokenURIs[tokenURI] = true;

    return newTokenId;
  }

  //function to buy nftitem
  function buyNft(
    uint tokenId
  )public payable{
   //I can buy nft item by mean of tokenid
   uint price = _idToNftItem[tokenId].price;
   address owner = ERC721.ownerOf(tokenId);

   require(msg.sender != owner, "You already own this NFT");
   require(msg.value == price, "please submit the asking price");

   //unlisting the NFT
   _idToNftItem[tokenId].isListed = false;
   _listedItems.decrement();

   //transfer the ownership of nft aftrer brought
   _transfer(owner, msg.sender, tokenId);
   payable(owner).transfer(msg.value);
  }

  function _createNftItem(
    uint tokenId,
    uint price
  )private{
      require(price > 0, "price must be atleast 1");
//this function list the minted tokenid and its price
      _idToNftItem[tokenId] = NftItem(
        tokenId,
        price,
        msg.sender,
        true
      );
      emit NftItemCreated(tokenId, price, msg.sender, true);
  }

  
  }