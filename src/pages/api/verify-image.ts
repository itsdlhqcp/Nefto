import { v4 as uuidv4 } from "uuid";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import { addressCheckMiddleware, pinataApiKey, pinataSecretApiKey, withSession } from "./utils";
import { FileReq } from "@/types/ntf";
import axios from "axios";
import FormData from "form-data";

export default withSession(async (
  req: NextApiRequest & {session: Session}, 
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const {
      bytes,
      fileName,
      contentType
    } = req.body as FileReq;

    if (!bytes || !fileName || !contentType) {
      return res.status(422).send({message: "Image data are missing"});
    }

    await addressCheckMiddleware(req, res);
     //this buffer data is send to the server
    const buffer = Buffer.from(Object.values(bytes));
    const formData = new FormData();

    formData.append(
        "file",
        buffer, {
          contentType,
          filename: fileName + "-" + uuidv4()
        }
      );

      const fileRes = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      maxBodyLength: Infinity,
      headers: {
        "Accept": "text/plain",
        "Content-Type": `multipart/form-data; boundary=${formData.getBoundary()}`,
        pinata_api_key: '892194ef264f1ada4f57',
        pinata_secret_api_key: '9a5c0daf1bc80efbf9016a119318376fcff842cac124dbe69539c597070820f8'
      }
    });

    return res.status(200).send(fileRes.data);

  } else {
    return res.status(422).send({message: "Invalid endpoint"});
  }
})