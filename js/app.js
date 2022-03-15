'use strict';

/*  array of stores */
let cookieStores = [];

//  global helper function generates a random number given min and max parameters
function randomCustomers(min, max) {
  //  Ref: MDN documentation
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/*  cookie store constructor function */
function CookieStore(storeName, custMin, custMax, averageCookiesPerSale) {
  this.name = storeName;
  this.location = storeName; //  for now to support functionality during refactoring
  this.minCustomers = custMin;
  this.maxCustomer = custMax;
  this.avgCookiesPerSale = averageCookiesPerSale;
  this.salesTotal = 0; //  store the result of daily sales sum
  this.dailySales = []; //  store daily sales numbers
  this.storeOpensAt = 700;
  this.storeClosesAt = 2000;
  cookieStores.push(this); //  adds self to cookieStores array
}
/*  end constructor */

/*  get daily sales report prototype  */
CookieStore.prototype.getDailySalesReport = function() {
  let salesByDay = [];
  let salesTtl = 0;
  let hoursOpen = (this.storeClosesAt - this.storeOpensAt) / 100;

  for (let idx = 0; idx < hoursOpen; idx++) {
    let avgCookieSalesThisHour = this.getAvgCookieSalesPerHour();
    salesByDay.push(avgCookieSalesThisHour);
    salesTtl += avgCookieSalesThisHour;
    console.log(`avgCookieSalesThisHour: ${avgCookieSalesThisHour}`);
    console.log(`salesByDay ${salesByDay}`);
    console.log(`salesTtl ${salesTtl}`);

    this.dailySales = salesByDay;
    this.salesTotal = salesTtl;
  };

  console.log(`salesByDay ${salesByDay}, salesTtl ${salesTtl}`);
  this.dailySales = salesByDay;
  this.salesTotal = salesTtl;
}

/*  get average coookie sales per hour helper function */
CookieStore.prototype.getAvgCookieSalesPerHour = function() {
  let totalCookies = this.getCustomersPerHour() * this.avgCookiesPerSale;
  let storeHours = this.storeClosesAt - this.storeOpensAt;
  return Math.ceil(totalCookies / storeHours);
}

/*  get number of customers per hour  */
CookieStore.prototype.getCustomersPerHour = function() {
  return randomCustomers(this.minCustomers, this.maxCustomer);
}

/*  helper function instantiates cookie stores, triggers reports, and calls rendering functions  */
function renderSalesReport() {
  //  generate the stores
  new CookieStore('Seattle', 23, 65, 6.3);
  new CookieStore('Tokyo', 3, 24, 1.2);
  new CookieStore('Dubai', 11, 38, 3.7);
  new CookieStore('Paris', 20, 38, 2.3);
  new CookieStore('Lima', 2, 16, 4.6);

  //  render store data in a table in the browser
  let tableEl = document.getElementById('cookiestoretable');
  console.dir(tableEl);
  let headerEl = document.createElement('thead');
  tableEl.appendChild(headerEl);

  let row1 = document.createElement('tr');
  headerEl.appendChild(row1);

  let th1El = document.createElement('th');
  th1El.textContent = '';
  row1.appendChild(th1El);

  let th6amEl = document.createElement('th');
  th6amEl.textContent = '6:00am';
  row1.appendChild(th6amEl);

  let th7amEl = document.createElement('th');
  th7amEl.textContent = '7:00am';
  row1.appendChild(th7amEl);

  let th8amEl = document.createElement('th');
  th8amEl.textContent = '8:00am';
  row1.appendChild(th8amEl);

  let th9amEl = document.createElement('th');
  th9amEl.textContent = '9:00am';
  row1.appendChild(th9amEl);

  let th10amEl = document.createElement('th');
  th10amEl.textContent = '10:00am';
  row1.appendChild(th10amEl);

  let th11amEl = document.createElement('th');
  th11amEl.textContent = '11:00am';
  row1.appendChild(th11amEl);

  let th12pmEl = document.createElement('th');
  th12pmEl.textContent = '12:00pm';
  row1.appendChild(th12pmEl);

  let th1pmEl = document.createElement('th');
  th1pmEl.textContent = '1:00pm';
  row1.appendChild(th1pmEl);

  let th2pmEl = document.createElement('th');
  th2pmEl.textContent = '2:00pm';
  row1.appendChild(th2pmEl);

  let th3pmEl = document.createElement('th');
  th3pmEl.textContent = '3:00pm';
  row1.appendChild(th3pmEl);

  let th4pmEl = document.createElement('th');
  th4pmEl.textContent = '4:00pm';
  row1.appendChild(th4pmEl);

  let th5pmEl = document.createElement('th');
  th5pmEl.textContent = '5:00pm';
  row1.appendChild(th5pmEl);

  let th6pmEl = document.createElement('th');
  th6pmEl.textContent = '6:00pm';
  row1.appendChild(th6pmEl);

  let th7pmEl = document.createElement('th');
  th7pmEl.textContent = '7:00pm';
  row1.appendChild(th7pmEl);

  let thDltEl = document.createElement('th');
  thDltEl.textContent = 'Daily Location Total';
  row1.appendChild(thDltEl);

  //  create TBODY element
  let reportBodyEl = document.createElement('tbody');
  tableEl.appendChild(reportBodyEl);

  for (let idx = 0; idx < cookieStores.length; idx++) {
    console.log(`Seattle dailySales ${cookieStores[0].dailySales}`);

    cookieStores[idx].getDailySalesReport();
    console.log(cookieStores[0].dailySales);

    //  table data row, one for each location
    let reportRowEl = document.createElement('tr');
    reportBodyEl.appendChild(reportRowEl);

    let colHeader = document.createElement('th');
    colHeader.textContent = cookieStores[idx].name;
    reportRowEl.appendChild(colHeader);

    for (let idy = 0; idy < cookieStores[idx].dailySales.length; idy++) {
      //  daily sale data cell content, one for each hour
      let hourTD = document.createElement('td');
      hourTD.textContent = cookieStores[idx].dailySales[idy];
      reportRowEl.appendChild(hourTD);
    }

    //  daily location total, single cell, obj.salesTotal property value

  }
}

/*  DO THE THING  */
renderSalesReport();


// /*  TEST THAT OBJECTS ARE ACTUALLY CREATED  */
// for (let kdx = 0; kdx < cookieStores.length; kdx++) {
//   console.log(cookieStores[kdx].dailySales);
// }


// /*  teseting  */
// console.log(`${cookieStores[0].name}, ${cookieStores[0].location}`)
// cookieStores[0].getDailySalesReport();
// console.log(`Seattle salesTotal ${cookieStores[0].salesTotal}`);
// console.log(`hoursOpen ${cookieStores[0].hoursOpen}`);
// /*  testing */



/*  end table generator */

/*  Stores Sales Reports */
//  cycle through the stores and post the sales data to html 
// for (let storeID = 0; storeID < stores.length; storeID++) {
//   let store = stores[storeID];

//   /* Create a UL and LI child elements and populate them with store data */
//   let sectionEl = document.getElementById('salesList');

//   // add paragraph header to the Seattle report
//   let pElement = document.createElement('h3');
//   //pElement.createTextNode(Seattle.location);
//   pElement.innerHTML = store.location;
//   sectionEl.appendChild(pElement);

//   //  add ul and li elements below the paragraph element in the Seattle report
//   let ulElement = document.createElement('ul');
//   sectionEl.appendChild(ulElement);
//   let storeSalesReport = dailySalesReport(store);

//   let hourOfReport = Seattle.storeOpensAt;
//   let twelveHourTime = 0;

//   for (let idx = 0; idx < storeSalesReport.length; idx++) {
//     let ilElement = document.createElement('li');
//     let ampm = 'am';

//     if (hourOfReport < 12) {
//       ampm = 'am';
//       twelveHourTime = hourOfReport;
//     } else if (hourOfReport == 12) {
//       ampm = 'pm';
//       twelveHourTime = hourOfReport;
//     } else if (hourOfReport > 12) {
//       ampm = 'pm';
//       twelveHourTime = hourOfReport - 12;
//     }

//     if (hourOfReport === store.storeClosesAt) {
//       let hourlyRecord = `Total: ${storeSalesReport[idx]} cookies`;
//       let newText = document.createTextNode(hourlyRecord);
//       ilElement.appendChild(newText);
//       ulElement.appendChild(ilElement);
//       break;
//     } else {
//       let hourlyRecord = `${twelveHourTime}${ampm}: ${storeSalesReport[idx]} cookies`;
//       let newText = document.createTextNode(hourlyRecord);
//       ilElement.appendChild(newText);
//       ulElement.appendChild(ilElement);
//       hourOfReport++;
//     }
//   }
// }
/* Stores report to HTML */