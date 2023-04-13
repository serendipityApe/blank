const axios = require("axios");
const domain = "https://data.jsdelivr.com";

const specialList = {
  'react': '/umd/react.development.js',
  'react-dom': '/umd/react-dom.development.js',
  'vue': '/dist/vue.global.prod.js'
}


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
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }else if (req.method !== "POST") {
    return res.status(404).json({
      message: "invalid request",
    });
  }
  //React@18.2.0
  let { dependencies } = req?.body;
  console.log(req.body)
  // dependencies = JSON.parse(dependencies);
  let cdns = {};
  
  // if (!/\w+@\d+/.test(dependencies))
  //   return res.status(400).json({
  //     message: "invalid params",
  //   });

  // const {
  //   data: { entrypoints },
  // } = await jsDelivr.get(`/v1/packages/npm/${dependencies}/entrypoints`);
  const jsDelivrDependencies = Object.entries(dependencies).filter(dArr => {
    if(specialList[dArr[0]]){
      let dependency = `${dArr[0]}@${dArr[1]}`
      cdns[dependency] = {
        bundle: `https://cdn.jsdelivr.net/npm/${dependency}${specialList[dArr[0]]}`,
        package: {
          version: dArr[1]
        }
      };
      return false;
    }
    return true;
  })
  const reqs = jsDelivrDependencies.map(
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
      results.forEach(({ data: { entrypoints },config: { url } }) => {
        let tmpArr = url.split('/');
        const dependency = tmpArr[tmpArr.length - 2];
        let defaultEntrypoint = entrypoints?.file;
        let jsEntrypoint = entrypoints?.js.file;
          let entrypoint = defaultEntrypoint ? defaultEntrypoint : jsEntrypoint;
          cdns[dependency] = {
          bundle: `https://cdn.jsdelivr.net/npm/${dependency}${entrypoint}`,
          package: {
            version: `${dependency.split('@')[1]}`
          }
        };
      });

      //   const data = await jsDelivr.get(`/v1/packages/npm/${dependencies}`);
      console.log(cdns);
      res.status(200).json(JSON.stringify(cdns));
    })
    .catch((err) => res.json(err));
  //   res.send(dependencies);
};
