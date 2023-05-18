import { useListedNfts } from '@/styles/components/ui/hooks/web3';
import { BaseLayout,NftList } from '../styles/components/ui';
import type { NextPage } from 'next';
import { Nft } from '@/styles/components/ui/layouts/types/nft';



const Home: NextPage = () => {

  const { nfts } = useListedNfts();

  console.log(nfts.data);

  return (
    <BaseLayout>
      <div className="relative px-4 pt-16 pb-20 bg-gray-50 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Amazing Creatures NFTs</h2>
            <p className="max-w-2xl mx-auto mt-3 text-xl text-gray-500 sm:mt-4">
              Mint a NFT to get unlimited ownership forever!
            </p>
          </div>
          <NftList
           nfts={nfts.data as Nft[]}
          />
        </div>
      </div>
    </BaseLayout>
  )
}
export default Home
