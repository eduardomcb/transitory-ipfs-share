require("dotenv").config();

const defaultConfig = {
  PORT: process.env.PORT || 8000,
  NFT_API_KEY: process.env.NFT_API_KEY,
  MONGO_URI: process.env.MONGO_URI,
};

export default {
  ...defaultConfig,
};
