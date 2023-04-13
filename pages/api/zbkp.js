const axios = require("axios");
const apiKey = "7SFiQ==Y9Vd5aefSZ7By61NMTjQ=";
const zbk = axios.create({
  baseURL: "http://api.heclouds.com/devices/1065251844/datapoints?limit=10",
  headers: {
    "api-key": apiKey,
  },
});

module.exports = async (req, res) => {
  if (req.method !== "GET")
    return res.status(400).json({ message: "invalid request method" });
  const { data } = await zbk.get();
  res.status(200).json(data);
};
