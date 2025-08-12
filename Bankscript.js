"use strict";

const account1 = {
  owner: "Jonty Meshram",
  movements: [200, 400, 600, 150, 5000, -3525],
  interestRate: 1.2,
  password: "1234",
  type: "premium",
};

const account2 = {
  owner: "Sharukh Khan",
  movements: [100, -50, 300, 1500, -500, 3525],
  interestRate: 1.2,
  password: "2222",
  type: "premium",
};

const account3 = {
  owner: "Abhishek Bacchan",
  movements: [20, 40, 60, 50, 5000, -3525],
  interestRate: 1.2,
  password: "abc123",
  type: "basic",
};

const account4 = {
  owner: "Sanjay Dutt",
  movements: [2000, 4000, 6000, 1500, -5000, -3525],
  interestRate: 1.2,
  password: "4444",
  type: "standard",
};

const accounts = [account1, account2, account3, account4];

const signinbtn = document.querySelector(".login");
const containerMovements = document.querySelector(".movements");


let bankBalance = 0;
/*
signinbtn.addEventListener("submit", function (event) 
{
    event.preventDefault();

    const email = document.getElementById("input_user").value;
    const password = document.getElementById("input_password").value;

    for (let i = 0; i < accounts.length; i++)
        {
          if(email === accounts[i].owner && password === accounts[i].password) 
            {
              window.location.href = "bankappindex.html";
            }
        }

    
});
*/
const displayMovements = function(movements)
  {
    containerMovements.innerHTML = "";
      movements.forEach(function(value, index)
      {
        bankBalance += value;   

        const type = value > 0 ? "deposit" : "withdrawal";

        const html = ` 
          <div class="movements__row">
          <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
          <div class="movements__value">&#8377 ${value}</div>`;

          containerMovements.insertAdjacentHTML("afterbegin", html);
      });              

  }

displayMovements(account1.movements);
document.querySelector(".balance__value").textContent=`${bankBalance}`;