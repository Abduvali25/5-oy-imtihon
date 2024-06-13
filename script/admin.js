import { checkToken, redirect } from "./utils.js";

const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const adminBtn = document.getElementById("admin-btn");
const box = document.querySelector(".box");
const log = document.getElementById("logOut");


window.addEventListener("DOMContentLoaded", function () {
  const hasToken = checkToken();

  if (!hasToken) {
    redirect("/auth.html");
  }
});

const form = document.forms[0];
const products = [];

form.onsubmit = function(event) {
  event.preventDefault();

  const newProduct = {
    id: Date.now(),
    title: title.value,
    price: price.value,
    description: description.value,
  }

  products.push(newProduct);
  render(products);

  
  title.value = '';
  price.value = '';
  description.value = '';

}


function render(products) {
  box.innerHTML= "";
 products.forEach(function(el, index) {
  const divEl = document.createElement("div");
  divEl.classList.add("divEl")
  

   const pID = document.createElement("p");
   pID.innerHTML = "ID: " +el.id;
   pID.style.marginTop = "2px"
   divEl.append(pID);

  const pTitle = document.createElement("p");
  pTitle.innerHTML ="Name: " + el.title;
  pTitle.style.marginTop = "6px";
  pTitle.style.fontSize = "18px"
  divEl.append(pTitle);


  const pPrice = document.createElement("p");
  pPrice.innerHTML ="Price: " + el.price;
  pPrice.style.marginTop = "6px"
  divEl.append(pPrice);


  const pDescription = document.createElement("p");
  pDescription.innerHTML ="Description: " + el.description;
  pDescription.style.marginTop = "6px"
  divEl.append(pDescription);
  
  box.append(divEl);
 
});
}



adminBtn.disabled = true;
function checkInputs() {
  if (title.value.trim() === '' && price.value.trim() === '' && description.value.trim() === '') {
   
    } else {
  adminBtn.disabled = false;
}
}
title.addEventListener('input', checkInputs);
price.addEventListener('input', checkInputs);
description.addEventListener('input', checkInputs);
log.onclick = function() {
  redirect("/auth.html")
}