import { Session, withIronSession } from "next-iron-session";
import contract from "../../../public/contracts/NftMarket.json";
import { NextApiRequest, NextApiResponse } from "next";
import { NftMarketContract } from "@/types/nftMarketContract";
import { ethers } from "ethers";
import * as util from "ethereumjs-util";

const NETWORKS = {
  "5777": "Ganache"
}

type NETWORK = typeof NETWORKS;

const abi = contract.abi;

const targetNetwork = process.env.NEXT_PUBLIC_NETWORK_ID as keyof NETWORK;

export const contractAddress = contract["networks"][targetNetwork]["address"];
export const pinataApiKey = '892194ef264f1ada4f57';
export const pinataSecretApiKey = '9a5c0daf1bc80efbf9016a119318376fcff842cac124dbe69539c597070820f8';
//function which helps to prevent unauth user from uploading img in uploader
export function withSession(handler: any) {
  return withIronSession(handler, {
    password: '2^va5bkA&5VG6WergAYk7BB^jpyB#PHI',
    cookieName: "nft-auth-session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false
    }
  })
}
//address check middleware which verify data
export const addressCheckMiddleware = async (req: NextApiRequest & { session: Session}, res: NextApiResponse) => {
  return new Promise(async(resolve, reject) => {
    const message = req.session.get("message-session");
//this is provider working at server-for signning the message-getting contract
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
    const contract = new ethers.Contract(
      contractAddress,
      abi,
      provider
    ) as unknown as NftMarketContract;
//formating msg on wallet to simple one
    let nonce: string | Buffer = 
      "\x19Ethereum Signed Message:\n" +
      JSON.stringify(message).length + 
      JSON.stringify(message);
  //function signing signature at server side
    nonce = util.keccak(Buffer.from(nonce, "utf-8")); 
    const { v, r, s } = util.fromRpcSig(req.body.signature);
    const pubKey = util.ecrecover(util.toBuffer(nonce), v,r,s);
    const addrBuffer = util.pubToAddress(pubKey);
    const address = util.bufferToHex(addrBuffer);

    if (address === req.body.address) {
      resolve("Verified-Correct Address");
    } else {
      reject("Wrong Address");
    }
  })
}