async function getGuitars() {
  try {
    let response = await axios.get("http://localhost:3000/gitarshop/");
    return response.data.shop_guitars;
  } catch (error) {
    console.log(error.response);
  }
}

async function createGuitars() {
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
    console.log(error.response);
  }
}

function createElement(
  tagName,
  children = [],
  classes = [],
  attributes = {},
  eventListeners = {}
) {
  const myElement = document.createElement(tagName);

  for (const child of children) {
    myElement.append(child);
  }

  for (const cls of classes) {
    myElement.classList.add(cls);
  }

  for (const attr in attributes) {
    myElement.setAttribute(attr, attributes[attr]);
  }

  for (const listener in eventListeners) {
    const functionArray = eventListeners[listener];
    myElement.addEventListener(listener, functionArray);
  }

  return myElement;
}

function render(guitars) {
  let th1 = createElement("th", ["ID"], [], { scope: "col" });
  let th2 = createElement("th", ["Munifucture Year"], [], { scope: "col" });
  let th3 = createElement("th", ["Brand"], [], { scope: "col" });
  let th4 = createElement("th", ["Number of Strings"], [], { scope: "col" });
  let th5 = createElement("th", ["Used"], [], { scope: "col" });
  let th6 = createElement("th", ["Long Neck"], [], { scope: "col" });
  let th7 = createElement("th", ["Price"], [], { scope: "col" });

  let mainTr = createElement("tr", [th1, th2, th3, th4, th5, th6, th7]);
  let thead = createElement("thead", [mainTr], ["thead-dark"]);

  let trArray = [];
  for (let guitar of guitars) {
    let thID = createElement("th", [guitar._id], [], { scope: "col" });
    let td2 = createElement("td", [guitar._munifuctureYear]);
    let td3 = createElement("td", [guitar._brand]);
    let td4 = createElement("td", [guitar._numberOfStrings]);
    let td5 = createElement("td", [guitar._used]);
    let td6 = createElement("td", [guitar._longNeck]);
    let td7 = createElement("td", [guitar._price]);
    trArray.push(createElement("tr", [thID, td2, td3, td4, td5, td6, td7]));
  }
  let tbody = createElement("tbody", [...trArray]);
  let table = createElement("table", [thead, tbody], ["table"]);
  let mainDiv = createElement("div", [table], ["col", "md-auto"]);
  document.querySelector("#bodyDiv").append(mainDiv);
}

async function main() {
  let x = await createGuitars();
  let guitars = await getGuitars();
  console.log(guitars);
  render(guitars);
}
main();
