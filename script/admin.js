import { checkToken, redirect } from "./utils.js";

const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const adminBtn = document.getElementById("admin-btn");
const box = document.querySelector(".box")
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
 products.forEach(function(el, index) {
  const divEl = document.createElement("div");
  divEl.style.border = "1px solid black";
  divEl.style.display = "inline-block";
  divEl.style.padding = "20px";
  divEl.style.marginTop ='50px';
  divEl.style.marginLeft = "550px";
  divEl.style.borderRadius = "5px"

   const pID = document.createElement("p");
   pID.innerHTML = el.id;
   divEl.append(pID);

  const pTitle = document.createElement("p");
  pTitle.innerHTML = el.title;
  divEl.append(pTitle);


  const pPrice = document.createElement("p");
  pPrice.innerHTML = el.price;
  divEl.append(pPrice);


  const pDescription = document.createElement("p");
  pDescription.innerHTML = el.description;
  divEl.append(pDescription);
  
  box.append(divEl);
});
}



function checkInputs() {
  if (title.value.trim() === '' && price.value.trim() === '' && description.value.trim() === '') {
      adminBtn.disabled = true;   
    } else {
  adminBtn.disabled = false;
}
}
title.addEventListener('input', checkInputs);
price.addEventListener('input', checkInputs);
description.addEventListener('input', checkInputs);
// function button(){
//   if(title && price && description === ''){
//     adminBtn.disabled = true;
//   }else{
//     adminBtn.disabled = false;
//   }
// }
// button();
