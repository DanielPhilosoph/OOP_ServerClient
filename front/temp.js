const { default: axios } = require("axios");
try {
  let response = await axios.post(
    "http://localhost:3000/gitarshop/add",
    {
      kind: "ElectricGuitar",
      munifuctureYear: 1999,
      brand: "daniel's",
      price: 12000,
      used: false,
      longNeck: false,
    },
    { header: { "Content-Type": "appliction/json" } }
  );
  console.log(response);
} catch (error) {
  console.log(error);
}

//"http://localhost:3000/gitarshop/guitar/1"

try {
  let response = await axios.get("http://localhost:3000/gitarshop/guitar/1");
  console.log(response.data.guitar);
} catch (error) {
  console.log(error);
}
