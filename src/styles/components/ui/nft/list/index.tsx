/* eslint-disable @next/next/no-img-element */
import { FunctionComponent } from "react";
import { Nft, NftMeta } from "../../layouts/types/nft";

import NftItem from "./item";

type NftListProps = {
  nfts: Nft[]
}
///Here data is fetched from the imported meta data json format file

const NftList: FunctionComponent<NftListProps> = ({nfts}) => {
    return (
        <div className="grid max-w-lg gap-5 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
         { nfts.map(nft =>
        <div key={nft.meta.image} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
          <NftItem
          item={nft}
          />
        </div>
      )}
      </div>
    
    )
}

export default NftList