import { menuArray } from "./data.js";
const order = document.getElementById("orders");
const modal = document.getElementById("completeOrder");
const completeOrderBtn = document.getElementById("completeOrder-btn");
const pageMask = document.getElementById("page-mask");

document.addEventListener("click", function (e) {
  const id = e.target.dataset.id;
  let element = menuArray.filter(function (e) {
    return e.id == id;
  });
  if (element.length) {
    let array = [];
    if (localStorage.getItem("orderItems")) {
      let newArray = JSON.parse(localStorage.getItem("orderItems"));
      array = newArray;
    }
    array.push(element[0]);
    localStorage.setItem("orderItems", JSON.stringify(array));
    renderOrder(array);
  }

  if (e.target.dataset.remove) {
    const remove = document.querySelector(
      `button[data-remove="${e.target.dataset.remove}"]`
    ).parentElement;
    const array = JSON.parse(localStorage.getItem("orderItems"));
    array.splice(remove.id, 1);
    localStorage.setItem("orderItems", JSON.stringify(array));
    renderOrder(array);
  }
  if (order.innerHTML && e.target.id == "complete-btn") {
    modal.classList.remove("none");
    pageMask.classList.remove("none");
  }
  if (e.target.id === "page-mask") {
    modal.classList.add("none");
    pageMask.classList.add("none");
  }
  if (e.target.id === "completeOrder-btn") {
    let isFormValid = document.getElementById("form").checkValidity();
    if (isFormValid) {
      const name = document.getElementById("name").value;
      console.log(name);
      order.innerHTML = `<h2 class="thanks">Thanks, ${name}! Your order is on its way</h2>`;
      localStorage.clear();
      e.preventDefault();
      modal.classList.add("none");
      pageMask.classList.add("none");
    }
  }
});

function render() {
  let innerHtml = "";
  const items = document.getElementById("menuItems");
  menuArray.forEach(function (item) {
    const { name, ingredients, price, emoji, id } = item;
    innerHtml += `<div class="items">
  <h2 class="emoji">${emoji}</h2>
  <div class="text">
    <h2 class="item-title">${name}</h2>
    <p class="ingridents">${ingredients.join(", ")}
    <span class="price">$${price}</span>
    </p>
  </div>
  <button class="add-btn" data-id="${id}">➕</button>
</div>`;
  });
  items.innerHTML = innerHtml;
  localStorage.clear();
}
render();

function renderOrder(array) {
  let innerHtml = "";
  if (!array.length) {
    order.innerHTML = innerHtml;
    return;
  }
  let totalAmount = 0;
  innerHtml += `<h2 class="center">Your Order</h2>`;
  array.forEach((item, index) => {
    innerHtml += `<div class="orderItems" id="${index}">
    <h3 class="orderItem">${item.name}</h3>
    <button class="remove-btn" data-remove="${item.id}">remove</button>
    <h3 class="rightSide">$${item.price}</h3>
  </div>`;
    totalAmount += item.price;
  });
  innerHtml += `  <div class="totalOrders">
<h3 class="orderItem">Total price:</h3>
<h3 class="rightSide">$${totalAmount}</h3>
</div>
<div class="completeOrder">
<button id="complete-btn" class="complete-btn">Complete order</button>
</div>`;

  order.innerHTML = innerHtml;
}
