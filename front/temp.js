const { default: axios } = require("axios");
try {
  let response = await axios.post(
    "http://localhost:3000/gitarshop/add",
    {
      kind: "BassGuitar",
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

try {
  let response = await axios.post(
    "http://localhost:3000/gitarshop/add",
    {
      kind: "ClassicGuitar",
      munifuctureYear: 1994,
      brand: "daniel's",
      price: 2000,
      used: true,
    },
    { header: { "Content-Type": "appliction/json" } }
  );
  console.log(response);
} catch (error) {
  console.log(error);
}

try {
  let response = await axios.delete("http://localhost:3000/gitarshop/sell/2", {
    header: { "Content-Type": "appliction/json" },
  });
  console.log(response);
} catch (error) {
  console.log(error);
}

try {
  let response = await axios.post(
    "http://localhost:3000/gitarshop/add",
    {
      kind: "ClassicGuitar",
      munifuctureYear: 1994,
      brand: "daniel's",
      price: 1000,
      used: true,
    },
    { header: { "Content-Type": "appliction/json" } }
  );
  console.log(response);
} catch (error) {
  console.log(error);
}

//"http://localhost:3000/gitarshop/guitar/1"

try {
  let response = await axios.get("http://localhost:3000/gitarshop/play/1");
  console.log(response.data);
} catch (error) {
  console.log(error);
}

try {
  let response = await axios.get("http://localhost:3000/gitarshop/playsolo/1");
  console.log(response.data);
} catch (error) {
  console.log(error);
}

try {
  let response = await axios.post(
    "http://localhost:3000/gitarshop/soundof",
    {
      sound: "🎸",
    },
    { header: { "Content-Type": "appliction/json" } }
  );
  console.log(response.data);
} catch (error) {
  console.log(error);
}

try {
  let response = await axios.post("http://localhost:3000/gitarshop/update/1", {
    price: 1200,
    used: true,
  });
  console.log(response.data);
} catch (error) {
  console.log(error);
}

try {
  let response = await axios.get("http://localhost:3000/gitarshop/guitar/1");
  console.log(response.data);
} catch (error) {
  console.log(error);
}
