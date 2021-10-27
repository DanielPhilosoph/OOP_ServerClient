let kindInput = document.querySelector("#kindInput");
let munifuctureInput = document.querySelector("#inputMunifuctureYear");
let priceInput = document.querySelector("#priceInput");
let numberOfStringsInput = document.querySelector("#inputNumberOfStrings");
let brandInput = document.querySelector("#brandInput");
let longNeck = document.querySelectorAll("input[name='longneck']");
let usedInput = document.querySelectorAll("#input[name='used']");
let addButton = document
  .querySelector("#add")
  .addEventListener("click", onClick);

function usedAnswer() {
  let selectedValue;
  for (const rb of usedInput) {
    if (rb.checked) {
      selectedValue = rb.value;
      break;
    }
  }
  return selectedValue;
}

function longneckAnswer() {
  let selectedValue;
  for (const rb of longNeck) {
    if (rb.checked) {
      selectedValue = rb.value;
      break;
    }
  }
  return selectedValue;
}

async function onClick() {
  let response = await addGuitar();
  if (response !== undefined) {
    alert(response);
  }
}

async function addGuitar() {
  try {
    let longVal = longneckAnswer() === "true";
    let usedVal = usedAnswer() === "true";
    let response = await axios.post(
      "http://localhost:3000/gitarshop/add",
      {
        kind: kindInput.value,
        munifuctureYear: munifuctureInput.value,
        brand: brandInput.value,
        numberOfString: numberOfStringsInput.value,
        price: priceInput.value,
        used: usedVal,
        longNeck: longVal,
      },
      { header: { "Content-Type": "appliction/json" } }
    );
    return response.data.message;
  } catch (error) {
    console.log(response.error);
  }
}
