const axios = require("axios");
const domain = "https://data.jsdelivr.com";

const jsDelivr = axios.create({
  baseURL: domain,
});
module.exports = async (req, res) => {
  //React@18.2.0
  const { dependecy } = req?.query;
  if (!dependecy.test(/\w+@\d+/))
    return res.json({
      message: "invalid params",
    });
  const {
    data: {
      entrypoints: { file: entrypoint },
    },
  } = jsDelivr.get(`/v1/packages/npm/${dependecy}/entrypoints`);
//   const data = await jsDelivr.get(`/v1/packages/npm/${dependecy}`);
  res.send(`https://cdn.jsdelivr.net/npm/${dependecy}/${entrypoint}`);
  res.send(dependecy);
};
