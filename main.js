let count = 0;
document.getElementById("card_counter").innerText = count;
function displayLoading() {
  const search_loading = document.getElementById("search_loading");
  search_loading.innerHTML = `
    <div class="loading text-center">
      <p>Loading...</p>
    </div>
  `;
}

function hideLoading() {
  const search_loading = document.getElementById("search_loading");
  search_loading.innerHTML = "";
}

function searchProduct() {
  const search = document.getElementById("search-input").value;

  if (!search.trim()) return;
  displayLoading();
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
    .then((res) => res.json())
    .then((data) => {
      hideLoading();
      displayProduct(data.drinks);
    });
}
function displayProduct(products) {
  const search_loading = document.getElementById("search_loading");
  const card_box = document.getElementById("card_box");
  search_loading.innerHTML = "";
  card_box.innerHTML = "";
  if (!products || products.length == 0) {
    const searchDiv = document.createElement("div");
    searchDiv.innerHTML = `
     <div class="text-center">
        <h2>Items Not Found</h2>
      </div>
    `;
    search_loading.appendChild(searchDiv);
    return;
  }
  products.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("col-4");
    div.classList.add("px-2");
    div.classList.add("my-2");
    div.innerHTML = `
              <div class="card">
                <img
                  src=${product?.strDrinkThumb}
                  class="card-img-top h-50 w-100"
                  alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Name: ${product?.strGlass}</h5>
                  <h5 class="fs-6">Category: ${product?.strCategory}</h5>
                  <p class="card-text">
                    ${product?.strInstructions.slice(0, 15)}...
                  </p>
                  <div class="text-center">
  <button onClick="addToCard('${product?.strGlass}', '${
      product?.strDrinkThumb
    }')" class="btn btn-outline-primary me-2">
                      Add to cart
                    </button>
                    <button onClick="handleDetails('${
                      product.idDrink
                    }')" type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"> Details</button>
                  </div>
                </div>
              </div>
     `;
    card_box.appendChild(div);
  });
}
function addToCard(name, img) {
  if (count == 7) return alert("You can't add more then 7 items");
  count += 1;
  document.getElementById("card_counter").innerText = count;
  const table_body = document.getElementById("table_body");
  const table_row = document.createElement("tr");
  table_row.innerHTML = `
                <th scope="row">${count}</th>
                <td>
                  <div style="width: 50px; height: 50px">
                    <img
                      class="w-100 h-100 rounded-circle"
                      src="${img}"
                      alt="" />
                  </div>
                </td>
                <td>${name}</td>            
  `;
  table_body.appendChild(table_row);
  console.log("add cart");
}
function handleDetails(id) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data.drinks[0]));
}
function displayDetails(item) {
  document.getElementById("exampleModalLabel").innerText = item.strDrink;

  document.querySelector("#exampleModal .modal-body").innerHTML = `
      <img src="${item.strDrinkThumb}" style="height:280px" class="card-img-top" alt="${item.strDrink}" />
      <strong class="my-2"> Details</strong>
      <p><strong>Category:</strong> ${item.strCategory}</p>
      <p><strong>Alcoholic:</strong> ${item.strAlcoholic}</p>
      <p>${item.strInstructions}</p>
    `;
}
fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
  .then((res) => res.json())
  .then((data) => displayProduct(data.drinks));
