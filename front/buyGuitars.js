async function onClick() {
  let answer = await buyItem();
  document.querySelector("#alert").innerHTML = answer;
}

async function buyItem() {
  let inputID = document.querySelector("#sellID").value;
  try {
    let response = await axios.delete(
      `http://localhost:3000/gitarshop/sell/${inputID}`,
      {
        header: { "Content-Type": "appliction/json" },
      }
    );
    return response.data.sold;
  } catch (error) {
    return error.response.data.error;
  }
}

function main() {
  document.querySelector("#btn").addEventListener("click", onClick);
}
main();
