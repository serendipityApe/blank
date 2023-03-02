const axios = require("axios");
const domain = "https://data.jsdelivr.com";

const jsDelivr = axios.create({
  baseURL: domain,
});
module.exports = async (req, res) => {
  //React@18.2.0
  const { dependency } = req?.query;
  if (!(/\w+@\d+/).test(dependency))
    return res.json({
      message: "invalid params",
    });
//   const {
//     data: {
//       entrypoints: { file: entrypoint },
//     },
//   } = jsDelivr.get(`/v1/packages/npm/${dependency}/entrypoints`);
const data = jsDelivr.get(`/v1/packages/npm/${dependency}/entrypoints`);
console.log(data);
res.send(JSON.stringify(data));
//   const data = await jsDelivr.get(`/v1/packages/npm/${dependency}`);
//   res.send(`https://cdn.jsdelivr.net/npm/${dependency}/${entrypoint}`)
//   res.send(dependency);
};
