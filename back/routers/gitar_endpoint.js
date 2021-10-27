const express = require("express");
const fs = require("fs");
const router = express.Router();
const guitars = [];
const MAX_GUITARS = 1000;

router.get("/", (req, res, next) => {
  try {
    res.json({ shop_guitars: guitars });
  } catch (error) {
    next({ status: 404, message: "error" });
  }
});

router.post("/update/:id", (req, res, next) => {
  // Set guitar properties
  try {
    let guitarIndex = findGuitarIndex(req.params.id);
    if (guitarIndex === false) {
      throw { status: 401, message: "id does'nt exsits" };
    } else {
      let successedUpdate = updateGuitar(guitarIndex, req.body);
      if (successedUpdate === true) {
        res.json({ message: "Successfully updated!" });
      } else {
        throw { status: 402, message: "unvalid " + successedUpdate };
      }
    }
  } catch (error) {
    next(error);
  }
});

router.post("/soundof", (req, res, next) => {
  try {
    let guitarType = ClassicGuitar.detectSound(req.body.sound);
    if (guitarType === false) {
      throw { status: 403, message: "none of the guitars" };
    } else {
      res.json({ soundof: guitarType });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/add", (req, res, next) => {
  try {
    let passedValidation = basicGuitarValidation(
      req.body.kind,
      req.body.munifuctureYear,
      req.body.price,
      req.body.numberOfString,
      req.body.used
    );
    if (passedValidation === true) {
      let id = generateID();
      if (id !== "MAX_GUITARS") {
        let success = addGuitar(req.body.kind, id, req.body);
        if (success === true) {
          res.json({
            message: "New guitar is added for the shop!",
            guitar_id: id,
          });
        } else {
          throw { status: 402, message: "unvalid " + success };
        }
      } else {
        throw { status: 500, message: "Max capacity" };
      }
    } else {
      throw { status: 402, message: "unvalid " + passedValidation };
    }
  } catch (error) {
    next(error);
  }
});

router.get("/play/:id", (req, res, next) => {
  try {
    let requestedGuitar = findGuitar(req.params.id);
    if (requestedGuitar === false) {
      throw { status: 401, message: "id does'nt exsits" };
    } else {
      res.json({ playing_sound: requestedGuitar.play() });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/guitar/:id", (req, res, next) => {
  try {
    let requestedGuitar = findGuitar(req.params.id);
    if (requestedGuitar === false) {
      throw { status: 401, message: "id does'nt exsits" };
    } else {
      res.json({ guitar: requestedGuitar.getGuitar() });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/playsolo/:id", (req, res, next) => {
  try {
    let requestedGuitar = findGuitar(req.params.id);
    if (requestedGuitar === false) {
      throw { status: 405, message: "id does'nt exsits" };
    } else if (requestedGuitar instanceof BassGuitar) {
      res.json({ playsolo: requestedGuitar.playSolo() });
    } else {
      throw { status: 402, message: "Guitar is not BassGuitar" };
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/sell/:id", (req, res, next) => {
  try {
    let requestedGuitar = findGuitar(req.params.id);
    if (requestedGuitar === false) {
      throw { status: 405, message: "id does'nt exsits" };
    } else {
      if (removeGuitar(req.params.id)) {
        res.json({ sold: "Guitar was successfully sold" });
      } else {
        throw {
          status: 500,
          message: "could not sell guitar - server error",
        };
      }
    }
  } catch (error) {
    next(error);
  }
});

function updateGuitar(guitarIndex, properies) {
  let passValidtion = basicGuitarValidation(
    undefined,
    undefined,
    properies.price,
    undefined,
    properies.used,
    properies.longNeck
  );
  if (passValidtion === true) {
    if (properies.price != undefined) {
      guitars[guitarIndex].price = properies.price;
    }
    if (properies.used != undefined) {
      guitars[guitarIndex].used = properies.used;
    }
    if (guitars[guitarIndex] instanceof ElectricGuitar) {
      if (properies.longNeck != undefined) {
        guitars[guitarIndex].longNeck = properies.longNeck;
      }
    }
    return true;
  } else {
    return passValidtion;
  }
}

function removeGuitar(id) {
  let index = 0;
  for (let guitar of guitars) {
    if (guitar.id == id) {
      guitars.splice(index, 1);
      return true;
    }
    index++;
  }
  return false;
}

function findGuitarIndex(id) {
  let index = 0;
  for (let guitar of guitars) {
    if (guitar.id == id) {
      return index;
    }
    index++;
  }
  return false;
}

function findGuitar(id) {
  for (let guitar of guitars) {
    if (guitar.id == id) {
      return guitar;
    }
  }
  return false;
}

function addGuitar(kind, id, reqBody) {
  if (kind === "ClassicGuitar") {
    guitars.push(
      new ClassicGuitar(
        reqBody.munifuctureYear,
        reqBody.brand,
        reqBody.price,
        reqBody.numberOfString,
        reqBody.used,
        id
      )
    );
  } else if (kind === "ElectricGuitar") {
    if (typeof reqBody.longNeck !== "boolean") {
      return "long neck";
    }
    guitars.push(
      new ElectricGuitar(
        reqBody.munifuctureYear,
        reqBody.brand,
        reqBody.price,
        reqBody.numberOfString,
        reqBody.used,
        id,
        reqBody.longNeck
      )
    );
  } else if (kind === "BassGuitar") {
    guitars.push(
      new BassGuitar(
        reqBody.munifuctureYear,
        reqBody.brand,
        reqBody.price,
        reqBody.numberOfString,
        reqBody.used,
        id
      )
    );
  }
  return true;
}

function generateID() {
  if (guitars.length === 0) {
    return 1;
  }
  let idArray = [];
  guitars.forEach((guitar) => {
    idArray.push(guitar.id);
  });
  for (let i = 2; i < MAX_GUITARS; i++) {
    let index = idArray.indexOf(i);
    if (index === -1) {
      return i;
    }
  }
  return "MAX_GUITARS";
}

function basicGuitarValidation(
  kind = undefined,
  munifuctureYear = undefined,
  price = undefined,
  numberOfString = undefined,
  used = undefined,
  longNeck = undefined
) {
  if (
    kind !== undefined &&
    kind !== "ClassicGuitar" &&
    kind !== "ElectricGuitar" &&
    kind !== "BassGuitar"
  ) {
    // Check if a kind has right name
    return "kind";
  } else if (
    munifuctureYear !== undefined &&
    (munifuctureYear < 1000 || munifuctureYear > 2021)
  ) {
    // Check munifuctureYear between 1000 and 2021
    return "munifucture year";
  } else if (price !== undefined && !/^\d+$/.test(price)) {
    // Check if a number
    return "price";
  } else if (
    numberOfString !== undefined &&
    !/^\d+$/.test(numberOfString) &&
    (numberOfString < 1 || numberOfString > 24)
  ) {
    // Check if a bumber and between 1 and 24
    return "number of string";
  } else if (used !== undefined && typeof used !== "boolean") {
    // Check if a boolian
    return "used";
  } else if (longNeck !== undefined && typeof longNeck !== "boolean") {
    return "long neck";
  } else {
    return true;
  }
}

module.exports = router;

class ClassicGuitar {
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
    this._id = id;
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

  get used() {
    return this._used;
  }

  set used(value) {
    if (typeof value !== "boolean") {
      console.log("not a boolean");
      return;
    }
    this._used = value;
  }

  get munifuctureYear() {
    return this._munifuctureYear;
  }

  get brand() {
    return this._brand;
  }

  get id() {
    return this._id;
  }

  static detectSound(sound) {
    if (sound.search("🎸") != -1) {
      return "ElectricGuitar";
    } else if (sound.search("🔊") != -1) {
      return "BassGuitar";
    } else if (sound.search("🎶") != -1) {
      return "ClassicGuitar";
    }
    return false;
  }

  getGuitar() {
    return {
      munifuctureYear: this._munifuctureYear,
      brand: this._brand,
      price: this._price,
      numberOfString: this._numberOfString,
      used: this._used,
      id: this.id,
    };
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

  get longNeck() {
    return this._longNeck;
  }

  set longNeck(value) {
    if (typeof value !== "boolean") {
      console.log("not a boolean");
      return;
    }
    this._longNeck = value;
  }

  play() {
    return "🎸🎸🎸";
  }

  getGuitar() {
    return {
      munifuctureYear: this._munifuctureYear,
      brand: this._brand,
      price: this._price,
      numberOfString: this._numberOfString,
      used: this._used,
      longNeck: this._longNeck,
      id: this.id,
    };
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

  getGuitar() {
    return {
      munifuctureYear: this._munifuctureYear,
      brand: this._brand,
      price: this._price,
      numberOfString: this._numberOfString,
      used: this._used,
      id: this.id,
    };
  }
}
