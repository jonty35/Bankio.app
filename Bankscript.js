"use strict";

const account1 = {
  owner: "Jonty Meshram",
  movements: [200, 400, 600, 150, 5000, -3525],
  interestRate: 1.2,
  password: "1234",
  type: "premium",
  accountno : 12345
};

const account2 = {
  owner: "Sharukh Khan",
  movements: [100, -50, 300, 1500, -500, 3525],
  interestRate: 1.2,
  password: "2222",
  type: "premium",
  accountno : 23456
};

const account3 = {
  owner: "Abhishek Bacchan",
  movements: [20, 40, 60, 50, 5000, -3525],
  interestRate: 1.2,
  password: "abc123",
  type: "basic",
  accountno : 34567
};

const account4 = {
  owner: "Sanjay Dutt",
  movements: [2000, 4000, 6000, 1500, -5000, -3525],
  interestRate: 1.2,
  password: "4444",
  type: "standard",
  accountno : 45678
};


const accounts = [account1, account2, account3, account4];

const signinbtn          = document.querySelector(".login");
const logo               = document.querySelector(".logo");
const app                = document.querySelector(".app");
const trans              = document.querySelector(".transparent-background");
const containerMovements = document.querySelector(".movements");
const transferBtn        = document.querySelector(".form__btn--transfer");
const transferTo         = document.querySelector(".form__input--to");
const transferamount     = document.querySelector(".form__input--amount");
const requestLoanbtn     = document.querySelector(".form__btn--loan");
const loanAmount         = document.querySelector(".form__input--loan-amount");
const logOut             = document.querySelector("#btn_logout");


let moneyIn = 0 ;
let moneyOut = 0 ;
let balance ;
let currentacc ;

function  displayMovements(data) 
{
  containerMovements.innerHTML = "";

    data.movements.forEach((value) =>
    {

      if(value > 0 )
      {
        moneyIn += value;
      }
      else
      {
        moneyOut += Math.abs(value);
      }
                
      const type = value > 0 ? "deposit" : "withdrawal";

       const html = `<div class="movements__row">
                    <div class="movements__type movements__type--${type}"> ${type}</div>
                    <div class="movements__value">&#8377 ${value}</div>`;
                    document.querySelector(".summary__value--in").textContent = `Rs. ${moneyIn}`;
                    document.querySelector(".summary__value--out").textContent = `Rs. ${moneyOut}`;
                    document.querySelector(".balance__label").textContent = `${data.owner.split(" ")[0]}'s Current Balance`;
                              
                    containerMovements.insertAdjacentHTML("afterbegin", html);
                              
    });
};


function displayBalance(data)
{
    balance = data.movements.reduce((acm,mov) => {return acm += mov },0);

    document.querySelector(".balance__value").textContent = `Rs. ${balance}`;
}


signinbtn.addEventListener("submit", function (event) 
{

  event.preventDefault();

  const name = document.getElementById("input_user").value;
  const password = document.getElementById("input_password").value;

  currentacc = accounts.find(accounts => (accounts.owner === name ));

  if(currentacc.password === password)
  {
    app.style.opacity = 1 ; 

    trans.style.zIndex=0 ;

    trans.style.opacity = 0;

    logo.style.margin = '0 auto';
         
    displayMovements(currentacc);  

    displayBalance(currentacc);      
  }

});


transferBtn.addEventListener("click", function(event)
{ 
  event.preventDefault();

  const amount = Number(transferamount.value);
            
      if( amount > 0 && currentacc && balance >= amount && currentacc.accountno !== Number(transferTo.value))
      {
        for(let i = 0; i < accounts.length; i++)
        {
                   
          if(accounts[i].accountno == transferTo.value)
          {
            accounts[i].movements.push(amount);

            currentacc.movements.push(-amount) ;

            moneyIn = 0;
            moneyOut = 0;

            displayMovements(currentacc);
            displayBalance(currentacc);
                      
            transferTo.value = "";
            transferamount.value = null;
          }
        }
      }
      else
      {
      alert("Check bank balance or amount you entered or account numbers");
      }

});
  

requestLoanbtn.addEventListener("click", function(event)
{

  event.preventDefault();

  currentacc.movements.push(Number(loanAmount.value));

  moneyIn = 0;
  moneyOut = 0;

  displayMovements(currentacc);
  displayBalance(currentacc);

  loanAmount.value = null;

});


logOut.addEventListener("click", function(event)
{
  event.preventDefault();
              
    app.style.opacity = 0 ; 
    trans.style.opacity = 1;
                
});



