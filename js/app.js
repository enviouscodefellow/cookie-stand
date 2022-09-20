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
console.log(storeHours);

let locations = ['Seattle', 'Tokyo', 'Dubai', 'Paris', 'Lima'];

let minCusts = [23, 3, 11, 20, 2];

let maxCusts = [65, 24, 38, 38, 16];

let avgSales = [6.3, 1.2, 3.7, 2.3, 4.6];

let salesSection = document.getElementById('cookie-stand');

console.dir(salesSection);

// **** HELPER FUNCTIONS - UTILITES *****

// used from MDN docs
function custs(loc) {
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
    // else{
    //   console.log(`invalid location`);
    // }
  }
}

function sales(loc) {
  for (let i = 0; i < locations.length; i++) {
    if (loc === locations[i]) {
      let sales = avgSales[i];
      return sales;
    }

    // else {
    //   console.log(`invalid location`);
    // }
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

function totalSales(avgSale, totalCusts) {
  let salesTotalDaily = totalCusts * avgSale;
  return salesTotalDaily;
}

// ****** OBJECT LITERALS *******

let seattle = {
  name: 'Seattle',
  customers: 0,
  avgSales: 0,
  dailyCustTotal: 0,
  dailySalesTotal: 0,
  getSales: function () {
    this.avgSales = sales(this.name);
  },
  getCusts: function () {
    this.customers = custs(this.name);
  },
  getDailyCustTotal: function () {
    this.dailyCustTotal = totalCusts(this.customers);
  },
  getDailySalesTotal: function () {
    this.dailySalesTotal = totalSales(this.avgSales, this.dailyCustTotal);
  },
  render: function(){
    let ulElem = document.createElement('ul');
    salesSection.appendChild(ulElem);
    for (let i = 0; i < storeHours.length; i++) {
      let liElem = document.createElement('li');
      liElem.textContent = storeHours[i];
      ulElem.appendChild(liElem);
    }
  }
};

let tokyo = {
  name: 'Tokyo',
  customers: 0,
  avgSales: 0,
  dailyCustTotal: 0,
  dailySalesTotal: 0,
  getSales: function () {
    this.avgSales = sales(this.name);
  },
  getCusts: function () {
    this.customers = custs(this.name);
  },
  getDailyCustTotal: function () {
    this.dailyCustTotal = totalCusts(this.customers);
  },
  getDailySalesTotal: function () {
    this.dailySalesTotal = totalSales(this.avgSales, this.dailyCustTotal);
  }
};
let dubai = {
  name: 'Dubai',
  customers: 0,
  avgSales: 0,
  dailyCustTotal: 0,
  dailySalesTotal: 0,
  getSales: function () {
    this.avgSales = sales(this.name);
  },
  getCusts: function () {
    this.customers = custs(this.name);
  },
  getDailyCustTotal: function () {
    this.dailyCustTotal = totalCusts(this.customers);
  },
  getDailySalesTotal: function () {
    this.dailySalesTotal = totalSales(this.avgSales, this.dailyCustTotal);
  }
};
let paris = {
  name: 'Paris',
  customers: 0,
  avgSales: 0,
  dailyCustTotal: 0,
  dailySalesTotal: 0,
  getSales: function () {
    this.avgSales = sales(this.name);
  },
  getCusts: function () {
    this.customers = custs(this.name);
  },
  getDailyCustTotal: function () {
    this.dailyCustTotal = totalCusts(this.customers);
  },
  getDailySalesTotal: function () {
    this.dailySalesTotal = totalSales(this.avgSales, this.dailyCustTotal);
  }
};
let lima = {
  name: 'Lima',
  customers: 0,
  avgSales: 0,
  dailyCustTotal: 0,
  dailySalesTotal: 0,
  getSales: function () {
    this.avgSales = sales(this.name);
  },
  getCusts: function () {
    this.customers = custs(this.name);
  },
  getDailyCustTotal: function () {
    this.dailyCustTotal = totalCusts(this.customers);
  },
  getDailySalesTotal: function () {
    this.dailySalesTotal = totalSales(this.avgSales, this.dailyCustTotal);
  }
};

// ******** DOM MANIPULATION ********

//  ***** EXECUTABLE CODE *********
seattle.getCusts();
seattle.getSales();
seattle.getDailyCustTotal();
seattle.getDailySalesTotal();
tokyo.getCusts();
tokyo.getSales();
tokyo.getDailyCustTotal();
tokyo.getDailySalesTotal();
dubai.getCusts();
dubai.getSales();
dubai.getDailyCustTotal();
dubai.getDailySalesTotal();
paris.getCusts();
paris.getSales();
paris.getDailyCustTotal();
paris.getDailySalesTotal();
lima.getCusts();
lima.getSales();
lima.getDailyCustTotal();
lima.getDailySalesTotal();

console.log(seattle);
console.log(totalCusts(seattle.customers));
console.log(totalSales(seattle.avgSales,seattle.dailyCustTotal));
console.log(tokyo);
console.log(totalCusts(tokyo.customers));
console.log(totalSales(tokyo.avgSales,seattle.dailyCustTotal));
console.log(dubai);
console.log(totalCusts(dubai.customers));
console.log(totalSales(dubai.avgSales,seattle.dailyCustTotal));
console.log(paris);
console.log(totalCusts(paris.customers));
console.log(totalSales(paris.avgSales,seattle.dailyCustTotal));
console.log(lima);
console.log(totalCusts(lima.customers));
console.log(totalSales(lima.avgSales,seattle.dailyCustTotal));
