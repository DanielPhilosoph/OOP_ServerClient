const express = require("express");
const fs = require("fs");
const router = express.Router();
const gitars = [];

router.get("/", (req, res, next) => {
  try {
    let gitarColection = fs.readdirSync("./back/DB/gitars_stock");
    let gitarArray = [];
    gitarColection.forEach((gitar) => {
      let gitarInfo = fs.readFileSync(`./back/DB/gitars_stock/${gitar}`);
      gitarArray.push(JSON.parse(gitarInfo));
    });
    res.json({ gitars: gitarArray });
  } catch (error) {
    next("error");
  }
});

router.post("/add", (req, res, next) => {
  try {
    if (
      validation(
        req.body.kind,
        req.body.munifuctureYear,
        req.body.price,
        req.body.numberOfString,
        req.body.used
      ) === true
    ) {
    }
    res.send("YAY");
  } catch (error) {
    next(error);
  }
});

function generateID() {
  let idArray = [];
  gitars.forEach((guitar) => {
    idArray.push(guitar.id);
  });
  return id;
}

function validation(
  kind,
  munifuctureYear,
  price,
  numberOfString = 6,
  used = false
) {
  if (
    kind === undefined ||
    kind !== "ClassicGuitar" ||
    kind !== "ElectricGuitar" ||
    kind !== "BassGuitar"
  ) {
    // Check if a kind has right name
    return "kind";
  }
  if (munifuctureYear < 1000 || munifuctureYear > 2021) {
    // Check munifuctureYear between 1000 and 2021
    return "munifucture year";
  } else if (!/^\d+$/.test(price)) {
    // Check if a number
    return "price";
  } else if (
    !/^\d+$/.test(numberOfString) &&
    (numberOfString < 1 || numberOfString > 24)
  ) {
    // Check if a bumber and between 1 and 24
    return "number of string";
  } else if (typeof used !== "boolean") {
    // Check if a boolian
    return "used";
  } else {
    return true;
  }
}

module.exports = router;

class ClassicGuitar {
  #id;
  constructor(
    munifuctureYear,
    brand,
    price,
    numberOfString = 6,
    used = false,
    id
  ) {
    this._munifuctureYear = munifuctureYear;
    this._brand = brand;
    this._price = price;
    this._numberOfString = numberOfString;
    this._used = used;
    this.#id = id;
  }

  play() {
    this._price = this.price * 0.9;
    return "🎶🎶🎶";
  }

  get price() {
    return this._price;
  }

  set price(inputPrice) {
    if (typeof inputPrice !== "number") {
      console.log("Must be a number!");
      return;
    }
    this._price = inputPrice;
  }

  get munifuctureYear() {
    return this._munifuctureYear;
  }

  get brand() {
    return this._brand;
  }

  get id() {
    return this.#id;
  }

  static detectSound(sound) {
    if (sound.search("🎸") != -1) {
      return "ElectricGuitar";
    } else if (sound.search("🔊") != -1) {
      return "BassGuitar";
    }
  }
}

class ElectricGuitar extends ClassicGuitar {
  constructor(
    munifuctureYear,
    brand,
    price,
    numberOfString = 6,
    used = false,
    id,
    longNeck
  ) {
    super(munifuctureYear, brand, price, numberOfString, used, id);
    this._longNeck = longNeck;
  }

  play() {
    return "🎸🎸🎸";
  }
}

class BassGuitar extends ClassicGuitar {
  constructor(
    munifuctureYear,
    brand,
    price,
    numberOfString = 4,
    used = false,
    id
  ) {
    super(munifuctureYear, brand, price, numberOfString, used, id);
  }

  play() {
    return "🔊🔊🔊";
  }

  playSolo() {
    let soundArray = ["💥", "🤘", "🎵", "📢", "💢", "🕺"];
    const rndInt = Math.floor(Math.random() * 6);
    return soundArray[rndInt];
  }
}
