import { checkToken, redirect } from "./utils.js";

const form = document.forms[0];
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const authBnt = document.getElementById("auth-btn");

window.addEventListener("DOMContentLoaded", function () {
  const hasToken = checkToken();
  if (hasToken) {
    redirect("/index.html");
  }
});

const credentials = {
  email: emailInput.value,
  password: passwordInput.value,
};

emailInput.oninput = function (event) {
  credentials.email = event.target.value;
  console.log(credentials);
};

passwordInput.oninput = function (event) {
  credentials.password = event.target.value;
  console.log(credentials);
};

form.onsubmit = function (event) {
  event.preventDefault();
  login();
};

async function login() {
  const api_url = "https://api.escuelajs.co/api/v1/auth/login";
  try {
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    const { access_token, refresh_token } = data; // {}

    sessionStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);

    const hasToken = checkToken();
    if (hasToken) {
      redirect("/index.html");
    }
  } catch (error) {
    console.error;
  }
};

// function toggleButton () {
//   if(emailInput.value.trim() && passwordInput.value.trim() === '') {
//       authBnt.disabled = true;
//   } else {
//       authBnt.disabled = false;
//   }
// }
// toggleButton();

if(emailInput || passwordInput){
  authBnt.disabled = true;
}else{
  authBnt.disabled = false;
  handleLoginError()
}

 function checkInputs() {

    if (emailInput.value.trim() === '' && passwordInput.value.trim() === '') {
        authBnt.disabled = true;   
      } else {
    authBnt.disabled = false;
 }
 }
  emailInput.addEventListener('input', checkInputs());
  passwordInput.addEventListener('input', checkInputs);


  function handleLoginError(response) {
    if (response.status === 401) {
      alert("Invalid email or password. Please try again.");
    } else {
      alert("An error occurred. Please try again later.");
    }
  }
  handleLoginError();