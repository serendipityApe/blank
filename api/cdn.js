const axios = require("axios");
const domain = "https://data.jsdelivr.com";

const jsDelivr = axios.create({
  baseURL: domain,
});
module.exports = async (req, res) => {
  //React@18.2.0
  const { dependency } = req?.query;
  if (!/\w+@\d+/.test(dependency))
    return res.status(400).json({
      message: "invalid params",
    });
  const {
    data,
    entrypoints: {
      file: defaultEntrypoint,
      js: { file: jsEntrypoint },
    },
  } = await jsDelivr.get(`/v1/packages/npm/${dependency}/entrypoints`);
  const entrypoint = defaultEntrypoint ? defaultEntrypoint : jsEntrypoint;
  console.log(data);
  //   const data = await jsDelivr.get(`/v1/packages/npm/${dependency}`);
  res.send(`https://cdn.jsdelivr.net/npm/${dependency}/${entrypoint}`);
  //   res.send(dependency);
};
