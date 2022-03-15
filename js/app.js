'use strict';

//  a cookie store
let Seattle = {
  location: "Seattle",
  minCustomers: 23,
  maxCustomers: 65,
  avgCookiesPerSale: 6.3,
  storeOpensAt: 6,
  storeClosesAt: 20,
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
    let storeHours = this.storeClosesAt - this.storeOpensAt;
    return Math.ceil(totalCookies / storeHours);
  }
}

let Tokyo = {
  location: "Tokyo",
  minCustomers: 3,
  maxCustomers: 24,
  avgCookiesPerSale: 1.2,
  storeOpensAt: 6,
  storeClosesAt: 20,
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
    let storeHours = this.storeClosesAt - this.storeOpensAt;
    return Math.ceil(totalCookies / storeHours);
  }
}

let Dubai = {
  location: "Dubai",
  minCustomers: 11,
  maxCustomers: 38,
  avgCookiesPerSale: 3.7,
  storeOpensAt: 6,
  storeClosesAt: 20,
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
    let storeHours = this.storeClosesAt - this.storeOpensAt;
    return Math.ceil(totalCookies / storeHours);
  }
}

let Paris = {
  location: "Paris",
  minCustomers: 20,
  maxCustomers: 38,
  avgCookiesPerSale: 2.3,
  storeOpensAt: 6,
  storeClosesAt: 20,
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
    let storeHours = this.storeClosesAt - this.storeOpensAt;
    return Math.ceil(totalCookies / storeHours);
  }
}

let Lima = {
  location: "Lima",
  minCustomers: 2,
  maxCustomers: 16,
  avgCookiesPerSale: 4.6,
  storeOpensAt: 6,
  storeClosesAt: 20,
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
    let storeHours = this.storeClosesAt - this.storeOpensAt;
    return Math.ceil(totalCookies / storeHours);
  }
}

//  global helper function to generate array of sales by hour with total sales per day
function dailySalesReport(store){
  let result = [];
  let totalSales = 0;
  let hoursOpen = store.storeClosesAt - store.storeOpensAt;
  //  console.log(`hoursOpen: ${hoursOpen}`);
  
  for (let idx = 0; idx < hoursOpen; idx++){
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


/*  create an array containing store objects */
let stores = [Seattle, Tokyo, Dubai, Paris, Lima];

/*  Stores Sales Reports */
//  cycle through the stores and post the sales data to html 
for (let storeID = 0; storeID < stores.length; storeID++) {
  let store = stores[storeID];

  /* Create a UL and LI child elements and populate them with store data */
  let sectionEl = document.getElementById('salesList');

  // add paragraph header to the Seattle report
  let pElement = document.createElement('h3');
  //pElement.createTextNode(Seattle.location);
  pElement.innerHTML = store.location;
  sectionEl.appendChild(pElement);

  //  add ul and li elements below the paragraph element in the Seattle report
  let ulElement = document.createElement('ul');
  sectionEl.appendChild(ulElement);
  let storeSalesReport = dailySalesReport(store);

  let hourOfReport = Seattle.storeOpensAt;
  let twelveHourTime = 0;

  for (let idx = 0; idx < storeSalesReport.length; idx++) {
    let ilElement = document.createElement('li');
    let ampm = 'am';

    if (hourOfReport < 12) {
      ampm = 'am';
      twelveHourTime = hourOfReport;
    } else if (hourOfReport == 12) {
      ampm = 'pm';
      twelveHourTime = hourOfReport;
    } else if (hourOfReport > 12) {
      ampm = 'pm';
      twelveHourTime = hourOfReport - 12;
    }

    if (hourOfReport === store.storeClosesAt) {
      let hourlyRecord = `Total: ${storeSalesReport[idx]} cookies`;
      let newText = document.createTextNode(hourlyRecord);
      ilElement.appendChild(newText);
      ulElement.appendChild(ilElement);
      break;
    } else {
      let hourlyRecord = `${twelveHourTime}${ampm}: ${storeSalesReport[idx]} cookies`;
      let newText = document.createTextNode(hourlyRecord);
      ilElement.appendChild(newText);
      ulElement.appendChild(ilElement);
      hourOfReport++;
    }
  }
}
/* Stores report to HTML */