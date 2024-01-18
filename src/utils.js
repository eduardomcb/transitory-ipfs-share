import { v4 as uuidv4 } from "uuid";

const getMetaData = async (url) => {
  const metaData = fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  return metaData;
};

const replaceUrl = (url) => {
  console.log("replaceUrl: ", url);
  return url.replace("ipfs://", "https://nftstorage.link/ipfs/");
};

const generateDownloadToken = () => {
  const uuid = uuidv4();
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 24);

  return {
    token: uuid,
    expiresAt: expirationDate,
  };
};

export { getMetaData, replaceUrl, generateDownloadToken };
