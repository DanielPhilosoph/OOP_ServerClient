const { default: axios } = require("axios");
try {
  let response = await axios.post(
    "http://localhost:3000/gitarshop/add",
    {
      kind: "ClassicGuitar",
      munifuctureYear: 1999,
      brand: "daniel's",
      price: 12000,
      used: false,
    },
    { header: { "Content-Type": "appliction/json" } }
  );
  console.log(response);
} catch (error) {
  console.log(error);
}
