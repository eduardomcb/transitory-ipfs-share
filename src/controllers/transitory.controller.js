import { NFTStorage, File } from "nft.storage";
import constants from "../config/constants";
import HTTPStatus from "http-status";
import { getMetaData, replaceUrl, generateDownloadToken } from "../utils";
import fileSchema from "../database/schemas/file.schema";
import axios from "axios";
import archiver from "archiver";
import fs from "fs";

class TransitoryController {
  constructor() {
    this.client = new NFTStorage({ token: constants.NFT_API_KEY });
    this.upload = this.upload.bind(this);
    this.download = this.download.bind(this);
  }

  async upload(req, res) {
    try {
      const downloadToken = generateDownloadToken();

      const metaData = await this.client.store({
        name: req.files.file.name,
        description: "anything",
        image: new File(
          [await fs.promises.readFile(req.files.file.tempFilePath)],
          req.files.file.name,
          {
            type: req.files.file.mimetype,
          }
        ),
      });

      const file = new fileSchema({
        cid: metaData.ipnft,
        name: req.files.file.name,
        mimeType: req.files.file.mimetype,
        expiresAt: downloadToken.expiresAt,
        downloadToken: downloadToken.token,
      });

      await file.save();

      return res.status(HTTPStatus.OK).json({
        downloadToken: file.downloadToken,
        expiresAt: file.expiresAt,
        downloadUrl: `http://${req.get("host")}/api/v1/download/${
          file.name
        }?token=${
          file.downloadToken
        }&expires=${downloadToken.expiresAt.getTime()}`,
        zipDownloadUrl: `http://${req.get("host")}/api/v1/zip/download/${
          file.name
        }?token=${
          file.downloadToken
        }&expires=${downloadToken.expiresAt.getTime()}`,
      });
    } catch (error) {
      console.error(error);
      return res.status(HTTPStatus.BAD_REQUEST).json({ error: error.message });
    }
  }

  async download(req, res) {
    try {
      const { fileName } = req.params;
      const { token } = req.query;

      const file = await fileSchema.findOne({ name: fileName });

      if (!file) {
        return res
          .status(HTTPStatus.NOT_FOUND)
          .json({ error: "File not found" });
      }

      if (token !== file.downloadToken) {
        return res
          .status(HTTPStatus.UNAUTHORIZED)
          .json({ error: "Token does not exist" });
      }

      if (Date.now() > file.expiresAt) {
        await fileSchema.deleteOne({ _id: file._id });
        await this.client.delete(file.cid);
        return res
          .status(HTTPStatus.UNAUTHORIZED)
          .json({ error: "Download link has expired" });
      }

      const meta = await getMetaData(
        `https://ipfs.io/ipfs/${file.cid}/metadata.json`
      );

      const imageResponse = await axios.get(replaceUrl(meta.image), {
        responseType: "arraybuffer",
      });

      res.setHeader("Content-Disposition", `attachment; filename=${file.name}`);
      res.setHeader("Content-Type", file.mimeType);

      return res.send(Buffer.from(imageResponse.data));
    } catch (error) {
      console.error(error);
      return res.status(HTTPStatus.BAD_REQUEST).json({ error: error.message });
    }
  }

  async zipDownload(req, res) {
    try {
      const { fileName } = req.params;
      const { token } = req.query;

      const file = await fileSchema.findOne({ name: fileName });

      if (!file) {
        return res
          .status(HTTPStatus.NOT_FOUND)
          .json({ error: "File not found" });
      }

      if (token !== file.downloadToken) {
        return res
          .status(HTTPStatus.UNAUTHORIZED)
          .json({ error: "Token does not exist" });
      }

      if (Date.now() > file.expiresAt) {
        await fileSchema.deleteOne({ _id: file._id });
        await this.client.delete(file.cid);
        return res
          .status(HTTPStatus.UNAUTHORIZED)
          .json({ error: "Download link has expired" });
      }

      const meta = await getMetaData(
        `https://ipfs.io/ipfs/${file.cid}/metadata.json`
      );

      const imageResponse = await axios.get(replaceUrl(meta.image), {
        responseType: "arraybuffer",
      });

      const archive = archiver("zip", { zlib: { level: 9 } });
      archive.append(Buffer.from(imageResponse.data), { name: file.name });

      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${file.name.substring(
          0,
          file.name.indexOf(".")
        )}.zip`
      );
      res.setHeader("Content-Type", "application/zip");

      archive.pipe(res);
      archive.finalize();
    } catch (error) {
      console.error(error);
      return res.status(HTTPStatus.BAD_REQUEST).json({ error: error.message });
    }
  }
}

export default new TransitoryController();
