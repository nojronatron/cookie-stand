'use strict';

//  global helper function to generate array of sales by hour with total sales per day
function dailySalesReport(store){
  let result = [];
  let totalSales = 0;
  let hoursOpen = store.storeCloseHour - store.storeOpenHour;
  console.log(`hoursOpen: ${hoursOpen}`);
  
  for(let idx=0; idx < hoursOpen; idx++){
    let avgCookieSalesThisHour = store.getAvgCookieSalesPerHour();
    result.push(avgCookieSalesThisHour);
    totalSales += avgCookieSalesThisHour;
  };
  
  result.push(totalSales);
  return result;
}

//  global helper function generates a random number given min and max parameters
function randomCustomers(min, max) {
  //  Ref: MDN documentation
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//  a cookie store
let Seattle = {
  location: "Seattle",
  minCustomers: 23,
  maxCustomers: 65,
  avgCookiesPerSale: 6.3,
  storeOpenHour: 6,
  storeCloseHour: 19,
  setSalesStats(minCust, maxCust, averageCookiesPerSale) {
    this.minCustomers = minCust;
    this.maxCustomers = maxCust;
    this.avgCookiesPerSale = averageCookiesPerSale;
  },
  getCustomersPerHour: function () {
    //  call this to get a random number between minCustomers and maxCustomers, inclusive
    return randomCustomers(this.minCustomers, this.maxCustomers);
  },
  getAvgCookieSalesPerHour: function () {
    let totalCookies = this.getCustomersPerHour() * this.avgCookiesPerSale;
    let storeHours = this.storeCloseHour - this.storeOpenHour;
    return Math.ceil(totalCookies / storeHours);
  }
}

let temp = dailySalesReport(Seattle);
console.log(temp);

/* Create a UL and LI child elements and populate them with Seattle data */
let sectionEl = document.getElementById('salesList');
console.log(sectionEl);

// add paragraph header to the Seattle report
let pElement = document.createElement('p');
//pElement.createTextNode(Seattle.location);
pElement.innerHTML = Seattle.location;
sectionEl.appendChild(pElement);

//  add ul and li elements below the paragraph element in the Seattle report
let ulElement = document.createElement('ul');
sectionEl.appendChild(ulElement);
let seattleSalesReport = dailySalesReport(Seattle);


for (let idx = 0; idx < seattleSalesReport.length; idx++){
  let ilElement = document.createElement('li');
  let newText = document.createTextNode(seattleSalesReport[idx]);
  ilElement.appendChild(newText);
  ulElement.appendChild(ilElement);
}
/* End Seattle Data */