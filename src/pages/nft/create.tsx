/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next'
import { ChangeEvent, useState } from 'react';
import { BaseLayout } from '../../styles/components/ui'
import { Switch } from '@headlessui/react'
import Link from 'next/link'
import { NftMeta, PinataRes } from '@/types/ntf';
import axios from 'axios';
import { useWeb3 } from '@/provider/web3';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { useNetwork } from '@/styles/components/ui/hooks/web3';
import { MoonIcon } from '@heroicons/react/24/outline';

const ATTRIBUTES = ["health", "attack", "speed"]
const ALLOWED_FIELDS = ["name", "description", "image", "attributes"];

const NftCreate: NextPage = () => {
  const {ethereum,contract} = useWeb3();
  const {network} = useNetwork();
  const [nftURI, setNftURI] = useState("");
  const [hasURI, setHasURI] = useState(false);
  const [price, setPrice] = useState("");
  const [nftMeta, setNftMeta] = useState<NftMeta>({
    name: "",
    description: "",
    image: "",
    attributes: [
      {trait_type: "attack", value: "0"},
      {trait_type: "health", value: "0"},
      {trait_type: "speed", value: "0"},
    ]
  });
   //function which getting signed data of image at server side
  const getSignedData = async () => {
    const messageToSign = await axios.get("/api/verify");
    const accounts = await ethereum?.request({method: "eth_requestAccounts"}) as string[];
    const account = accounts[0];

    const signedData = await ethereum?.request({
      method: "personal_sign",
      params: [JSON.stringify(messageToSign.data), account, messageToSign.data.id]
    })

    return {signedData, account};
  }

  //Handle image to upload by loading it as bytes from site server side to IPFS server
  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {  //if no image target length set to zero
      console.error("Select a file");
      return;
    }
//function which send the verified img data to IPFS piniata
    const file = e.target.files[0];
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    try {
      const {signedData, account} = await getSignedData();
      const promise = axios.post("/api/verify-image", {
        address: account,
        signature: signedData,
        bytes,
        contentType: file.type,
        fileName: file.name.replace(/\.[^/.]+$/, "")
      });
      const res = await toast.promise(
        promise, {
          pending: "Minting NFT Token",
          success: "Nft created",
          error: "Minting Error"
        }
      )
      const data = res.data as PinataRes;

      setNftMeta({
        ...nftMeta,
        image: `https://gateway.pinata.cloud//ipfs/${data.IpfsHash}`
      });
    } catch(e: any) {
      console.error(e.message);
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNftMeta({...nftMeta, [name]: value});
  }

  const handleAttributeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const attributeIdx = nftMeta.attributes.findIndex(attr => attr.trait_type === name);

    nftMeta.attributes[attributeIdx].value = value;
    setNftMeta({
      ...nftMeta,
      attributes: nftMeta.attributes
    })
  }

  const uploadMetadata = async () => {
    try {
      const {signedData, account} = await getSignedData();
     //sending msg data to server to verify
      const promise = axios.post("/api/verify", {
        address: account,
        signature: signedData,
        nft: nftMeta
      })

      const res = await toast.promise(
        promise, {
          pending: "Minting NFT Token",
          success: "Nft created",
          error: "Minting Error"
        }
      )

      const data = res.data as PinataRes;
      setNftURI(`https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  const createNft = async () => {
    try {
      const nftRes = await axios.get(nftURI, {
        headers: {"Accept": "text/plain"}
      });
      const content = nftRes.data;

      Object.keys(content).forEach(key => {
        if (!ALLOWED_FIELDS.includes(key)) {
          throw new Error("Invalid Json structure");
        }
      })
     //function setting minted tokens function
      const tx = await contract?.mintToken(
        nftURI,
        ethers.utils.parseEther(price), {
          value: ethers.utils.parseEther(0.025.toString())
        }
      );

      await toast.promise(
        tx!.wait(), {
          pending: "Uploading metadata",
          success: "Metadata uploaded",
          error: "Metadata upload Error"
        }
      );
    } catch(e: any) {
      console.error(e.message);
    }
  }
  if (!network.isConnectedToNetwork) {
    return (
      <BaseLayout>
        <div className="p-4 mt-10 rounded-md bg-yellow-50">
          <div className="flex">
            <div className="flex-shrink-0">
              <MoonIcon className="w-5 h-5 text-yellow-400" aria-hidden="true" />
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
      </BaseLayout>
    )
  }
  return (
    <BaseLayout>
      <div>
        <div className="py-4">
          { !nftURI &&
            <div className="flex">
              <div className="mr-2 font-bold underline">Do you have meta data already?</div>
              <Switch
                checked={hasURI}
                onChange={() => setHasURI(!hasURI)}
                className={`${hasURI ? 'bg-indigo-900' : 'bg-indigo-700'}
                  relative inline-flex flex-shrink-0 h-[28px] w-[64px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${hasURI ? 'translate-x-9' : 'translate-x-0'}
                    pointer-events-none inline-block h-[24px] w-[24px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                />
              </Switch>
            </div>
          }
        </div>
        { (nftURI || hasURI) ?
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">List NFT</h3>
                <p className="mt-1 text-sm text-gray-600">
                  This information will be displayed publicly so be careful what you share.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  { hasURI &&
                    <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
                      <div>
                        <label htmlFor="uri" className="block text-sm font-medium text-gray-700">
                          URI Link
                        </label>
                        <div className="flex mt-1 rounded-md shadow-sm">
                          <input
                            onChange={(e) => setNftURI(e.target.value)}
                            type="text"
                            name="uri"
                            id="uri"
                            className="flex-1 block w-full border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
                            placeholder="http://link.com/data.json"
                          />
                        </div>
                      </div>
                    </div>
                  }
                  { nftURI &&
                    <div className='p-4 mb-4'>
                      <div className="font-bold">Your metadata: </div>
                      <div>
                        <Link href={nftURI} legacyBehavior>
                          <a className="text-indigo-600 underline">
                            {nftURI}
                          </a>
                        </Link>
                      </div>
                    </div>
                  }
                  <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price (ETH)
                      </label>
                      <div className="flex mt-1 rounded-md shadow-sm">
                        <input
                         onChange={(e) => setPrice(e.target.value)}
                         value={price}
                          type="number"
                          name="price"
                          id="price"
                          className="flex-1 block w-full border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
                          placeholder="0.8"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                    <button
                    onClick={createNft}
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      List
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        :
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Create NFT Metadata</h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <div className="flex mt-1 rounded-md shadow-sm">
                      <input
                        value={nftMeta.name}
                        onChange={handleChange}
                        type="text"
                        name="name"
                        id="name"
                        className="flex-1 block w-full border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
                        placeholder="My Nice NFT"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                         value={nftMeta.description}
                        onChange={handleChange}
                        id="description"
                        name="description"
                        rows={3}
                        className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Some nft description..."
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description of NFT
                    </p>
                  </div>
                  {/* Has Image? */}
                  { nftMeta.image ?
                    <img src={nftMeta.image} alt="" className="h-40" /> :
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="w-12 h-12 mx-auto text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              onChange={handleImage}
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                  }
                  <div className="grid grid-cols-6 gap-6">
                  { nftMeta.attributes.map(attribute =>
                      <div key={attribute.trait_type} className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label htmlFor={attribute.trait_type} className="block text-sm font-medium text-gray-700">
                          {attribute.trait_type}
                        </label>
                        <input
                          type="text"
                          name={attribute.trait_type}
                          id={attribute.trait_type}
                          onChange={handleAttributeChange}
                          value={attribute.value}
                          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-sm !mt-2 text-gray-500">
                    Choose value from 0 to 100
                  </p>
                </div>
                <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                  <button
                    onClick={uploadMetadata}
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    List
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        }
      </div>
    </BaseLayout>
  )
}

export default NftCreate