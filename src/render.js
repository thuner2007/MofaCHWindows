let email;
let password;

// Define a function to handle form submission
function createAcc(event) {
  event.preventDefault(); // Prevent the default form submission

  email = document.getElementById("emailInput").value;
  password = document.getElementById("passwordInput").value;

  console.log(email);
  console.log(password);
}
