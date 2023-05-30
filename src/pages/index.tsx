import { useNetwork } from '@/styles/components/ui/hooks/web3';
import { BaseLayout,NftList } from '../styles/components/ui';
import type { NextPage } from 'next';

import { CloudIcon, CubeIcon, WalletIcon } from '@heroicons/react/24/outline';


const Home: NextPage = () => {
  const { network } = useNetwork();

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
          { network.isConnectedToNetwork ?
            <NftList /> :
            <div className="p-4 mt-10 rounded-md bg-yellow-50">
              <div className="flex">
                <div className="flex-shrink-0">
                  < WalletIcon className="w-5 h-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Attention needed</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                    { network.isLoading ?
                      "Loading..." :
                      `Connect to ${network.targetNetwork}`
                    }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </BaseLayout>
  )
}
export default Home
