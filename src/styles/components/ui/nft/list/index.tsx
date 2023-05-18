/* eslint-disable @next/next/no-img-element */
import { FunctionComponent } from "react";


import NftItem from "./item";
import { useListedNfts } from "../../hooks/web3";

///Here data is fetched from the imported meta data json format file

const NftList: FunctionComponent = () => {
  const { nfts } = useListedNfts();
    return (
        <div className="grid max-w-lg gap-5 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
         { nfts.data?.map(nft =>
        <div key={nft.meta.image} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
          <NftItem
          item={nft}
          buyNft={nfts.buyNft}
          />
        </div>
      )}
      </div>
    
    )
}

export default NftList