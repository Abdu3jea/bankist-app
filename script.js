"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data
const account1 = {
  owner: "Sarah Yen",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// display movements

const displayMovements = function (movements) {
  containerMovements.innerHTML = ""; // to delete the default movements
  movements.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1}${type}</div>
    <div class="movements__value">${mov}</div>
  </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
displayMovements(account1.movements);
// display balance
const displayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance}€`;
};
displayBalance(account1.movements);

// display summary
const displaySummary = function (movements) {
  const incomes = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;
  const outComes = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outComes)}€`;
  const interest = movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * 1.2) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
displaySummary(account1.movements);
// compute username
const user = "Steven Thomas Williams"; // username stw
// const createUsername = (user) => {
//   const userName = user
//     .toLowerCase()
//     .split(" ")
//     .map((word) => word[0])
//     .join("");
//   console.log(userName);
// };
// createUsername(user);
const createUsername = (accs) => {
  accs.forEach((acc) => {
    acc.username = acc.owner // create user name
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
};
createUsername(accounts);
console.log(accounts);

/////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// // function

// const displayMovements = (movements, sort = false) => {
//   const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
//   containerMovements.textContent = "";
//   movs.forEach((mov, i) => {
//     const type = mov > 0 ? "deposit" : "withdrawal";
//     const html = `
//   <div class="movements__row">
//         <div class="movements__type movements__type--${type}">${
//       i + 1
//     } ${type}</div>

//         <div class="movements__value">${mov}€</div>
//       </div>`;
//     containerMovements.insertAdjacentHTML("afterbegin", html);
//   });
// };

// // display balance
// const displayBalance = (acc) => {
//   acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
//   labelBalance.textContent = `${acc.balance}€`;
// };

// // display summary
// const displaySummary = (acc) => {
//   const incomes = acc.movements
//     .filter((mov) => mov > 0)
//     .reduce((acc, mov) => acc + mov, 0);
//   labelSumIn.textContent = `${incomes}€`;
//   const outComes = acc.movements
//     .filter((mov) => mov < 0)
//     .reduce((acc, mov) => acc + mov, 0);
//   labelSumOut.textContent = `${Math.abs(outComes)}€`;

//   const interest = acc.movements
//     .filter((mov) => mov > 0)
//     .map((deposit) => (deposit * acc.interestRate) / 100)
//     .filter((int) => int >= 1)
//     .reduce((acc, mov) => acc + mov, 0);
//   labelSumInterest.textContent = `${interest}€`;
// };

// // create userName
// const createUsername = (accs) => {
//   accs.forEach((acc) => {
//     acc.username = acc.owner
//       .toLowerCase()
//       .split(" ")
//       .map((name) => name[0])
//       .join("");
//   });
// };
// createUsername(accounts);
// console.log(accounts);

// const updateUI = (acc) => {
//   // display movement
//   displayMovements(currentAccount.movements);
//   // display balance
//   displayBalance(currentAccount);
//   // display summary
//   displaySummary(currentAccount);
// };
// // event hundller
// let currentAccount;
// btnLogin.addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log("login");
//   currentAccount = accounts.find(
//     (acc) => inputLoginUsername.value === acc.username
//   );
//   console.log(currentAccount);

//   if (
//     currentAccount.username === inputLoginUsername.value &&
//     currentAccount.pin === +inputLoginPin.value
//   ) {
//     // display welcome message
//     labelWelcome.textContent = `welcome back,${
//       currentAccount.owner.split(" ")[0]
//     }`;
//     containerApp.style.opacity = 100;

//     // UpdateUI
//     updateUI(currentAccount);
//   }
//   inputLoginUsername.value = inputLoginPin.value = "";
//   inputLoginPin.blur();
// });
// btnTransfer.addEventListener("click", (e) => {
//   e.preventDefault();
//   const amount = +inputTransferAmount.value;
//   const reciverAcc = accounts.find(
//     (acc) => inputTransferTo.value === acc.username
//   );
//   console.log(amount, reciverAcc);
//   if (
//     amount > 0 &&
//     reciverAcc &&
//     currentAccount.balance > amount &&
//     reciverAcc?.username !== currentAccount.username
//   ) {
//     currentAccount.movements.push(-amount);
//     reciverAcc.movements.push(amount);

//     updateUI(currentAccount);
//   }
//   inputTransferTo.value = inputTransferAmount.value = "";
// });

// btnLoan.addEventListener("click", (e) => {
//   e.preventDefault();
//   const amount = +inputLoanAmount.value;
//   if (
//     amount > 0 &&
//     currentAccount.movements.some((acc) => amount > acc * 0.1)
//   ) {
//     currentAccount.movements.push(amount);
//     updateUI(currentAccount);
//   }
//   inputLoanAmount.value = "";
// });

// btnClose.addEventListener("click", (e) => {
//   e.preventDefault();
//   if (
//     currentAccount.username === inputCloseUsername.value &&
//     currentAccount.pin === +inputClosePin.value
//   ) {
//     const index = accounts.findIndex(
//       (acc) => acc.username === currentAccount.username
//     );
//     console.log(index);
//     accounts.splice(index, 1);
//     containerApp.style.opacity = 0;
//   }
//   inputCloseUsername.value = inputClosePin.value = "";
// });
// let sorted = false;
// btnSort.addEventListener("click", (e) => {
//   e.preventDefault();
//   displayMovements(currentAccount.movements, !sorted);
//   sorted = !sorted;
// });
