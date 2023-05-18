/* eslint-disable @next/next/no-img-element */
import { FunctionComponent } from "react";
import { Nft, NftMeta } from "../../../layouts/types/nft";

type NftItemProps ={
  item: Nft;
  buyNft: (token: number, value: number) => Promise<void>;
}
///This function will take the data from index.js of list and render at UI
const NftItem: FunctionComponent<NftItemProps> = ({item, buyNft}) => {
    return (
        <>
          <div className="flex-shrink-0">
            <img
              className={`h-full w-full object-cover`}
              src={item.meta.image}
              alt="New NFT"
            />
          </div>
          <div className="flex flex-col justify-between flex-1 p-6 bg-white">
            <div className="flex-1">
              <p className="text-sm font-medium text-indigo-600">
                Creatures NFT
              </p>
              <div className="block mt-2">
              <p className="text-xl font-semibold text-gray-900">{item.meta.name}</p>
            <p className="mt-3 mb-3 text-base text-gray-500">{item.meta.description}</p>
              </div>
            </div>
            <div className="mb-4 overflow-hidden">
              <dl className="flex flex-wrap -mx-4 -mt-4">
                <div className="flex flex-col px-4 pt-4">
                  <dt className="order-2 text-sm font-medium text-gray-500">Price</dt>
                  <dd className="order-1 text-xl font-extrabold text-indigo-600">
                    <div className="flex items-center justify-center">
                    {item.price}
                      {/* <img className="h-6" src="/images/small-eth.webp" alt="ether icon"/>
                      ETH */}
                    </div>
                  </dd>
                </div>
                { item.meta.attributes.map(attribute =>
              <div key={attribute.trait_type} className="flex flex-col px-4 pt-4">
                <dt className="order-2 text-sm font-medium text-gray-500">
                  {attribute.trait_type}
                </dt>
                <dd className="order-1 text-xl font-extrabold text-indigo-600">
                  {attribute.value}
                </dd>
              </div>
            )}
              </dl>
            </div>
            <div>
              <button
               onClick={() => {
                buyNft(item.tokenId, item.price);
              }}
                type="button"
                className="inline-flex items-center px-4 py-2 mr-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Buy
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Preview
              </button>
            </div>
          </div>
        </>
    )
}

export default NftItem