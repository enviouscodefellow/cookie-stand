'use strict';
// TODO Within your javascript file, create separate JS object literals for each shop location. Each location will be responsible for generating sales data and providing output on an html document.

// OBJECT = SHOP
// * name
// * min customers
// * max customers
// * method for average cookies per customer
// * method for random number of customers
// * method for simulated cookie sales PER HOUR (average * random)
// * store results of cookie sales in an array (object property)
// * display results as unordered lists in html
// * function for sum totals to display

// **** GLOBALS / WINDOW INTO THE DOM *****

let storeHours = [
  '6am',
  '7am',
  '8am',
  '9am',
  '10am',
  '11am',
  '12pm',
  '1pm',
  '2pm',
  '3pm',
  '4pm',
  '5pm',
  '6pm',
  '7pm',
];

let locations = [];

let locationsCore = ['Seattle', 'Tokyo', 'Dubai', 'Paris', 'Lima'];

let minCusts = [];

let minCustsCore = [23, 3, 11, 20, 2];

let maxCusts = [];

let maxCustsCore = [65, 24, 38, 38, 16];

let avgSales = [];

let avgSalesCore = [6.3, 1.2, 3.7, 2.3, 4.6];

let locationsObjects = [];

let cookieTotalsHourly = [];
let sumTotal = 0;
let cookieGrandTotalsHourly = [];
let locationTotalsDaily = [];
let locationGrandTotalsDaily;

let salesSection = document.getElementById('sales-section');

let pElem = document.createElement('p');
salesSection.appendChild(pElem);

let tableElem = document.createElement('table');
pElem.appendChild(tableElem);

// **** FORM STEP 1: GRAB THE ELEMENT TO LISTEN TO! ******
let cookieForm = document.getElementById('cookie-form');

console.dir(salesSection);

// **** HELPER FUNCTIONS - UTILITES *****

function removeTfoot() {
  let tFoot = document.querySelector('tfoot');
  tFoot.parentNode.removeChild(tFoot);
}

function removeTbody() {
  for (let i = 0; i < locations.length - 1; i++) {
    let tBody = document.querySelector('tbody');
    tBody.parentNode.removeChild(tBody);
  }
}

function createHeader() {
  let theadElem = document.createElement('thead');
  tableElem.appendChild(theadElem);

  let trElem = document.createElement('tr');
  theadElem.appendChild(trElem);

  let thElemPush = document.createElement('th');
  thElemPush.textContent = `Hour:`;
  trElem.appendChild(thElemPush);

  for (let i = 0; i < storeHours.length; i++) {
    let thElem = document.createElement('th');
    thElem.textContent = `${storeHours[i]}`;
    trElem.appendChild(thElem);
  }

  let thElem2 = document.createElement('th');
  thElem2.textContent = `Daily Total`;
  trElem.appendChild(thElem2);
}
function createFooter() {
  let tfootElem = document.createElement('tfoot');
  tableElem.appendChild(tfootElem);

  let trElemFoot = document.createElement('tr');
  tfootElem.appendChild(trElemFoot);

  let thElemFootTitle = document.createElement('td');
  thElemFootTitle.textContent = `Total`;
  trElemFoot.appendChild(thElemFootTitle);

  for (let i = 0; i < storeHours.length; i++) {
    let thElemFoot = document.createElement('td');
    thElemFoot.textContent = `${cookieGrandTotalsHourly[i]}`;
    trElemFoot.appendChild(thElemFoot);
  }

  let thElemFoot2 = document.createElement('td');
  thElemFoot2.textContent = `${locationGrandTotalsDaily}`;
  trElemFoot.appendChild(thElemFoot2);
}
//FIXME?????????????????????????
function hourlyCookieTotalsAll() {
  if(cookieTotalsHourly.length <6){
    sumTotal = 0;
    for (let i = 0; i < cookieTotalsHourly[0].length; i++) {
      for (let j = 0; j < cookieTotalsHourly.length; j++) {
        sumTotal += cookieTotalsHourly[j][i];
        // console.log(sumTotal);
      }
      cookieGrandTotalsHourly.push(sumTotal);
      sumTotal = 0;
    }
  } else{
    for (let j = 0; j < cookieTotalsHourly.length; j++) {
      sumTotal += cookieTotalsHourly[j][cookieTotalsHourly.length];
      // console.log(sumTotal);
      cookieGrandTotalsHourly.pop(0);
      cookieGrandTotalsHourly.push(sumTotal);
    }
  }
}

function grandTotalAll() {
  let sumTotal = 0;
  for (let i = 0; i < locationTotalsDaily.length; i++) {
    sumTotal += locationTotalsDaily[i];
    locationGrandTotalsDaily = sumTotal;
  }
}

function makeBatter() {
  locations.length = 0;
  for (let i = 0; i < locationsCore.length; i++) {
    locations.push(locationsCore[i]);
  }
  minCusts.length = 0;
  for (let i = 0; i < minCustsCore.length; i++) {
    minCusts.push(minCustsCore[i]);
  }
  maxCusts.length = 0;
  for (let i = 0; i < maxCustsCore.length; i++) {
    maxCusts.push(maxCustsCore[i]);
  }
  avgSales.length = 0;
  for (let i = 0; i < avgSalesCore.length; i++) {
    avgSales.push(avgSalesCore[i]);
  }
}

function packageCookies() {
  for (let i = 0; i < locations.length; i++) {
    locationsObjects[i].getCusts();
    locationsObjects[i].getSales();
    locationsObjects[i].getHourlyCookies();
    locationsObjects[i].getDailyCustTotal();
    locationsObjects[i].getDailySalesTotal();
    locationsObjects[i].render();
  }
}

// function repackageCookies(){
//   locationsObjects[locationsObjects.length].getCusts();
//   locationsObjects[locationsObjects.length].getSales();
//   locationsObjects[locationsObjects.length].getHourlyCookies();
//   locationsObjects[locationsObjects.length].getDailyCustTotal();
//   locationsObjects[locationsObjects.length].getDailySalesTotal();
//   locationsObjects[locationsObjects.length].render();
// }

function custsPerHour(loc) {
  let randCustomers = new Array(storeHours.length);
  for (let i = 0; i < locations.length; i++) {
    if (loc === locations[i]) {
      let min = minCusts[i];
      let max = maxCusts[i];
      for (let j = 0; j < storeHours.length; j++) {
        randCustomers[j] = Math.floor(Math.random() * (max - min + 1) + min);
      }
      return randCustomers;
    }
  }
}

function sales(loc) {
  for (let i = 0; i < locations.length; i++) {
    if (loc === locations[i]) {
      let sales = avgSales[i];
      return sales;
    }
  }
}

function totalCusts(customer) {
  // console.log(customer.length);
  let custTotalDaily = 0;
  for (let i = 0; i < customer.length; i++) {
    custTotalDaily += customer[i];
  }
  return custTotalDaily;
}

function hourlyTotalCookies(custPerHour, avgSale) {
  let cookiesHourlyTotalsArray = new Array(storeHours.length);
  for (let i = 0; i < storeHours.length; i++) {
    cookiesHourlyTotalsArray[i] = Math.trunc(custPerHour[i] * avgSale);
  }
  return cookiesHourlyTotalsArray;
}

function totalSales(avgSale, totalCusts) {
  let salesTotalDaily = Math.trunc(totalCusts * avgSale);
  return salesTotalDaily;
}

// ****** CONSTRUCTOR FUNCTION *******
function CookieStand(name) {
  this.name = name;
  this.customers = [];
  this.avgSales = 0;
  this.hourlyCookies = [];
  this.dailyCustTotal = 0;
  this.dailySalesTotal = 0;

  locationsObjects.push(this);
}

// ****** CONSTRUCTOR(PROTOTYPE) METHODS *******
CookieStand.prototype.getCusts = function () {
  this.customers = custsPerHour(this.name);
};

CookieStand.prototype.getSales = function () {
  this.avgSales = sales(this.name);
};

CookieStand.prototype.getHourlyCookies = function () {
  this.hourlyCookies = hourlyTotalCookies(this.customers, this.avgSales);
  cookieTotalsHourly.push(this.hourlyCookies);
};

CookieStand.prototype.getDailyCustTotal = function () {
  this.dailyCustTotal = totalCusts(this.customers);
};

CookieStand.prototype.getDailySalesTotal = function () {
  this.dailySalesTotal = totalSales(this.avgSales, this.dailyCustTotal);
  locationTotalsDaily.push(this.dailySalesTotal);
};

CookieStand.prototype.render = function () {
  let tbodyElem = document.createElement('tbody');
  tableElem.appendChild(tbodyElem);

  let trElemRow1 = document.createElement('tr');
  tbodyElem.appendChild(trElemRow1);

  let thElem2 = document.createElement('td');
  thElem2.textContent = this.name;
  trElemRow1.appendChild(thElem2);

  for (let i = 0; i < storeHours.length; i++) {
    let thElem = document.createElement('td');
    thElem.textContent = this.hourlyCookies[i];
    trElemRow1.appendChild(thElem);
  }
  let thElem3 = document.createElement('td');
  thElem3.textContent = this.dailySalesTotal;
  trElemRow1.appendChild(thElem3);

  let trElemRow2 = document.createElement('tr');
  tbodyElem.appendChild(trElemRow2);

  let trElemRow3 = document.createElement('tr');
  tbodyElem.appendChild(trElemRow3);

  let trElemRow4 = document.createElement('tr');
  tbodyElem.appendChild(trElemRow4);

  let trElemRow5 = document.createElement('tr');
  tbodyElem.appendChild(trElemRow5);
};

// ****** CREATE OBJECTS W/CONSTRUCTOR *******

function makeCookies() {
  for (let i = 0; i < locations.length; i++) {
    new CookieStand(locations[i]);
  }
}

function remakeCookies(name) {
  new CookieStand(name);
}

//FIXME//
// function repackageCookies(name) {
//   name.getCusts();
//   name.getSales();
//   name.getHourlyCookies();
//   name.getDailyCustTotal();
//   name.getDailySalesTotal();
//   let thElem = document.createElement('td');
//   thElem.textContent = name.hourlyCookies;
//   trElemRow1.appendChild(thElem);

//   let thElem3 = document.createElement('td');
//   thElem3.textContent = name.dailySalesTotal;
//   trElemRow1.appendChild(thElem3);
// }

//************Executables************** */
makeBatter();
console.log(locations);
console.log(minCusts);
console.log(maxCusts);
console.log(avgSales);
makeCookies();
packageCookies();
console.log(locationsObjects);
hourlyCookieTotalsAll();
console.log(locationTotalsDaily);
grandTotalAll();
console.log(cookieTotalsHourly);
console.log(locationGrandTotalsDaily);

createHeader();
createFooter();

//************FORM function*********** */

// ******** FORM DEMO ************

// **** STEP 3: define our callback *****
// goal: add new cookiestand and display on submit
// ** CALLED ON SUBMIT ACTION
function handleSubmit(event) {
  // ** STOP DEFAULT BEHAVIOUR
  event.preventDefault();

  // ** GATHER INFORMATION FROM FROM**
  let name = event.target.cityName.value;
  let min = event.target.minCusts.value;
  let max = event.target.maxCusts.value;
  let avg = event.target.avgSales.value;

  console.log(name);
  console.log(min);
  console.log(max);
  console.log(avg);

  locations.push(name);
  minCusts.push(min);
  maxCusts.push(max);
  avgSales.push(avg);

  console.log(locationsObjects);
  console.log(minCusts);
  console.log(maxCusts);
  console.log(avgSales);
  console.log(cookieTotalsHourly);

  // ** CREATE NEW FRANCHISE OBJECT VIA CONSTRUCTOR **
  remakeCookies(name);
  // repackageCookies(name);
  console.log(locationsObjects);
  console.log(minCusts);
  console.log(maxCusts);
  console.log(avgSales);
  console.log(cookieTotalsHourly);

  // ** RENDER OUR FRANCHISE ON SCREEN **

  removeTbody();
  removeTfoot();
  packageCookies();
  hourlyCookieTotalsAll();
  console.log(locationTotalsDaily);
  grandTotalAll();
  console.log(locationGrandTotalsDaily);

  createFooter();

  // ** CLEAR FORM FOR THE NEXT INPUT **
  cookieForm.reset();
}

// ****** STEP 2: ATTACH EVENT LISTENER: type of event, and our callback function or event handler ******
cookieForm.addEventListener('submit', handleSubmit);

// ** LAB HINT - REMOVE YOUR FOOTER, ADD YOUR ROW, RE-ADD YOUR FOOTER

// ****** OBJECT LITERALS *******
// let seattle = {
//   name: 'Seattle',
//   customers: 0,
//   avgSales: 0,
//   hourlyCookies: 0,
//   dailyCustTotal: 0,
//   dailySalesTotal: 0,
//   getSales: function () {
//     this.avgSales = sales(this.name);
//   },
//   getCusts: function () {
//     this.customers = custsPerHour(this.name);
//   },

//   getHourlyCookies: function () {
//     this.hourlyCookies = hourlyTotalCookies(this.customers, this.avgSales);
//   },
//   getDailyCustTotal: function () {
//     this.dailyCustTotal = totalCusts(this.customers);
//   },
//   getDailySalesTotal: function () {
//     this.dailySalesTotal = totalSales(this.avgSales, this.dailyCustTotal);
//   },
//   render: function () {
//     let pElem = document.createElement('p');
//     pElem.textContent = this.name;
//     salesSection.appendChild(pElem);

//     let ulElem = document.createElement('ul');
//     pElem.appendChild(ulElem);

//     for (let i = 0; i < storeHours.length; i++) {
//       let liElem = document.createElement('li');
//       liElem.textContent = `${storeHours[i]}: ${this.hourlyCookies[i]} cookies`;
//       ulElem.appendChild(liElem);
//     }

//     let liElem = document.createElement('li');
//     liElem.textContent = `Total: ${this.dailySalesTotal} cookies`;
//     ulElem.appendChild(liElem);
//   },
// };

// let tokyo = {
//   name: 'Tokyo',
//   customers: 0,
//   avgSales: 0,
//   hourlyCookies: 0,
//   dailyCustTotal: 0,
//   dailySalesTotal: 0,
//   getSales: function () {
//     this.avgSales = sales(this.name);
//   },
//   getCusts: function () {
//     this.customers = custsPerHour(this.name);
//   },

//   getHourlyCookies: function () {
//     this.hourlyCookies = hourlyTotalCookies(this.customers, this.avgSales);
//   },
//   getDailyCustTotal: function () {
//     this.dailyCustTotal = totalCusts(this.customers);
//   },
//   getDailySalesTotal: function () {
//     this.dailySalesTotal = totalSales(this.avgSales, this.dailyCustTotal);
//   },
//   render: function () {
//     let pElem = document.createElement('p');
//     pElem.textContent = this.name;
//     salesSection.appendChild(pElem);

//     let ulElem = document.createElement('ul');
//     pElem.appendChild(ulElem);

//     for (let i = 0; i < storeHours.length; i++) {
//       let liElem = document.createElement('li');
//       liElem.textContent = `${storeHours[i]}: ${this.hourlyCookies[i]} cookies`;
//       ulElem.appendChild(liElem);
//     }

//     let liElem = document.createElement('li');
//     liElem.textContent = `Total: ${this.dailySalesTotal} cookies`;
//     ulElem.appendChild(liElem);
//   },
// };
// let dubai = {
//   name: 'Dubai',
//   customers: 0,
//   avgSales: 0,
//   hourlyCookies: 0,
//   dailyCustTotal: 0,
//   dailySalesTotal: 0,
//   getSales: function () {
//     this.avgSales = sales(this.name);
//   },
//   getCusts: function () {
//     this.customers = custsPerHour(this.name);
//   },

//   getHourlyCookies: function () {
//     this.hourlyCookies = hourlyTotalCookies(this.customers, this.avgSales);
//   },
//   getDailyCustTotal: function () {
//     this.dailyCustTotal = totalCusts(this.customers);
//   },
//   getDailySalesTotal: function () {
//     this.dailySalesTotal = totalSales(this.avgSales, this.dailyCustTotal);
//   },
//   render: function () {
//     let pElem = document.createElement('p');
//     pElem.textContent = this.name;
//     salesSection.appendChild(pElem);

//     let ulElem = document.createElement('ul');
//     pElem.appendChild(ulElem);

//     for (let i = 0; i < storeHours.length; i++) {
//       let liElem = document.createElement('li');
//       liElem.textContent = `${storeHours[i]}: ${this.hourlyCookies[i]} cookies`;
//       ulElem.appendChild(liElem);
//     }

//     let liElem = document.createElement('li');
//     liElem.textContent = `Total: ${this.dailySalesTotal} cookies`;
//     ulElem.appendChild(liElem);
//   },
// };
// let paris = {
//   name: 'Paris',
//   customers: 0,
//   avgSales: 0,
//   hourlyCookies: 0,
//   dailyCustTotal: 0,
//   dailySalesTotal: 0,
//   getSales: function () {
//     this.avgSales = sales(this.name);
//   },
//   getCusts: function () {
//     this.customers = custsPerHour(this.name);
//   },

//   getHourlyCookies: function () {
//     this.hourlyCookies = hourlyTotalCookies(this.customers, this.avgSales);
//   },
//   getDailyCustTotal: function () {
//     this.dailyCustTotal = totalCusts(this.customers);
//   },
//   getDailySalesTotal: function () {
//     this.dailySalesTotal = totalSales(this.avgSales, this.dailyCustTotal);
//   },
//   render: function () {
//     let pElem = document.createElement('p');
//     pElem.textContent = this.name;
//     salesSection.appendChild(pElem);

//     let ulElem = document.createElement('ul');
//     pElem.appendChild(ulElem);

//     for (let i = 0; i < storeHours.length; i++) {
//       let liElem = document.createElement('li');
//       liElem.textContent = `${storeHours[i]}: ${this.hourlyCookies[i]} cookies`;
//       ulElem.appendChild(liElem);
//     }

//     let liElem = document.createElement('li');
//     liElem.textContent = `Total: ${this.dailySalesTotal} cookies`;
//     ulElem.appendChild(liElem);
//   },
// };
// let lima = {
//   name: 'Lima',
//   customers: 0,
//   avgSales: 0,
//   hourlyCookies: 0,
//   dailyCustTotal: 0,
//   dailySalesTotal: 0,
//   getSales: function () {
//     this.avgSales = sales(this.name);
//   },
//   getCusts: function () {
//     this.customers = custsPerHour(this.name);
//   },

//   getHourlyCookies: function () {
//     this.hourlyCookies = hourlyTotalCookies(this.customers, this.avgSales);
//   },
//   getDailyCustTotal: function () {
//     this.dailyCustTotal = totalCusts(this.customers);
//   },
//   getDailySalesTotal: function () {
//     this.dailySalesTotal = totalSales(this.avgSales, this.dailyCustTotal);
//   },
//   render: function () {
//     let pElem = document.createElement('p');
//     pElem.textContent = this.name;
//     salesSection.appendChild(pElem);

//     let ulElem = document.createElement('ul');
//     pElem.appendChild(ulElem);

//     for (let i = 0; i < storeHours.length; i++) {
//       let liElem = document.createElement('li');
//       liElem.textContent = `${storeHours[i]}: ${this.hourlyCookies[i]} cookies`;
//       ulElem.appendChild(liElem);
//     }

//     let liElem = document.createElement('li');
//     liElem.textContent = `Total: ${this.dailySalesTotal} cookies`;
//     ulElem.appendChild(liElem);
//   },
// };

// ******** DOM MANIPULATION ********

//  ***** EXECUTABLE CODE *********
// seattle.getCusts();
// seattle.getSales();
// seattle.getHourlyCookies();
// seattle.getDailyCustTotal();
// seattle.getDailySalesTotal();
// tokyo.getCusts();
// tokyo.getSales();
// tokyo.getHourlyCookies();
// tokyo.getDailyCustTotal();
// tokyo.getDailySalesTotal();
// dubai.getCusts();
// dubai.getSales();
// dubai.getHourlyCookies();
// dubai.getDailyCustTotal();
// dubai.getDailySalesTotal();
// paris.getCusts();
// paris.getSales();
// paris.getHourlyCookies();
// paris.getDailyCustTotal();
// paris.getDailySalesTotal();
// lima.getCusts();
// lima.getSales();
// lima.getHourlyCookies();
// lima.getDailyCustTotal();
// lima.getDailySalesTotal();

// seattle.render();
// tokyo.render();
// dubai.render();
// paris.render();
// lima.render();

// console.log(seattle);
// console.log(totalCusts(seattle.customers));
// console.log(totalSales(seattle.avgSales, seattle.dailyCustTotal));
// console.log(tokyo);
// console.log(totalCusts(tokyo.customers));
// console.log(totalSales(tokyo.avgSales, seattle.dailyCustTotal));
// console.log(dubai);
// console.log(totalCusts(dubai.customers));
// console.log(totalSales(dubai.avgSales, seattle.dailyCustTotal));
// console.log(paris);
// console.log(totalCusts(paris.customers));
// console.log(totalSales(paris.avgSales, seattle.dailyCustTotal));
// console.log(lima);
// console.log(totalCusts(lima.customers));
// console.log(totalSales(lima.avgSales, seattle.dailyCustTotal));
