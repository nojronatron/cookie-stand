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
    return totalCookies / storeHours;
  }
}

let temp = dailySalesReport(Seattle);
console.log(temp);
