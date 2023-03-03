const axios = require("axios");
const domain = "https://data.jsdelivr.com";

const jsDelivr = axios.create({
  baseURL: domain,
});

// @returns
// "foo": {
//  "package": {
//    "version": "1.0.0"
//  },
//  "bundle": "cdn"
// }

// @returns
// "foo@18.2.0": {
//  "bundle": "cdn"
// }
module.exports = (req, res) => {
  //React@18.2.0
  let { dependencies } = req?.body;
  dependencies = JSON.parse(dependencies);
  if (req.method !== "POST") {
    return res.status(404).json({
      message: "invalid request",
    });
  }
  // if (!/\w+@\d+/.test(dependencies))
  //   return res.status(400).json({
  //     message: "invalid params",
  //   });

  // const {
  //   data: { entrypoints },
  // } = await jsDelivr.get(`/v1/packages/npm/${dependencies}/entrypoints`);

  const reqs = Object.entries(dependencies).map(
    (dependency) =>
      new Promise((res, rej) =>
        res(
          jsDelivr.get(
            `/v1/packages/npm/${dependency[0]}@${dependency[1]}/entrypoints`
          )
        )
      )
  );
  // console.log(entrypoints);
  Promise.all(reqs)
    .then((results) => {
      let cdns = {};
      results.forEach(({ data: { entrypoints },config: { url } }) => {
        // const dependency = url.split("/").pop();
        console.log("111");
        let defaultEntrypoint = entrypoints?.file;
        let jsEntrypoint = entrypoints?.js.file;
        let entrypoint = defaultEntrypoint ? defaultEntrypoint : jsEntrypoint;
        cdns[results] = {
          bundle: `https://cdn.jsdelivr.net/npm/${dependency}${entrypoint}`,
        };
      });

      //   const data = await jsDelivr.get(`/v1/packages/npm/${dependencies}`);
      console.log(cdns);
      res.json(JSON.stringify(cdns));
    })
    .catch((err) => res.json(err));
  //   res.send(dependencies);
};
