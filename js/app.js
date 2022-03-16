'use strict';

/*  CookieStore instance storage  */
let cookieStores = [];

/*  2d array of store sales data  */
let allStoresSalesData = [];

/*  cookiestore definition  */
function CookieStore(name, minCust, maxCust, avgCPerSale) {
  this.location = name;
  this.minCustomers = minCust;
  this.maxCustomers = maxCust;
  this.avgCookiesPerSale = avgCPerSale;
  this.storeOpensAt = 6;
  this.storeClosesAt = 20;  //  hundred hours
  this.hourlySales = [];
  this.totalSales = 0;
  cookieStores.push(this);
}

/*  prototype function sets hourlySales and totalSales data   */
CookieStore.prototype.generateSalesReport = function () {
  let hoursOpen = this.storeClosesAt - this.storeOpensAt;
  let accumulatedSales = 0;

  for (let idx = 0; idx < hoursOpen; idx++){
    let totalCookies = Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1) + this.minCustomers);
    totalCookies *= this.avgCookiesPerSale;
    totalCookies = Math.ceil(totalCookies);
    this.hourlySales.push(totalCookies);
    accumulatedSales += totalCookies;
  }

  this.totalSales = accumulatedSales;
}

/*  populate the allStoreData array so hourly sums can be produced  */
function populateAllStoresSalesData() {
  let allStoresSales = [];

  for (let cookieStoreId = 0; cookieStoreId < cookieStores.length; cookieStoreId++){
    cookieStores[cookieStoreId].generateSalesReport();
    allStoresSales.push(cookieStores[cookieStoreId].hourlySales);
  }

  for (let timeframe = 0; timeframe < 14; timeframe++){
    let runningSum = 0;

    for (let storeLocation = 0; storeLocation < cookieStores.length; storeLocation++) {
      runningSum += allStoresSales[storeLocation][timeframe];
    }

    allStoresSalesData.push(runningSum);
  }
}

/*  render the header row */
function renderHeader() {
  let tableEl = document.getElementById('salesTable');
  let headerEl = document.createElement('thead');
  tableEl.appendChild(headerEl);
  let row1 = document.createElement('tr');
  headerEl.appendChild(row1);

  //  first th data is empty
  let th1El = document.createElement('th');
  th1El.textContent = '';
  row1.appendChild(th1El);

  //  create th elements with a reasonable clock-time as content
  for (let ldx = 0; ldx < 14; ldx++) {
    let thEl = document.createElement('th');
    let cellContent = '';
    let hour = ldx + 6;
    let hours = ':00';

    //  javascript does the work to make the header time slots correct
    if (hour < 12) {
      cellContent = `${hour}${hours}am`;
    }
    if (hour == 12) {
      cellContent = `${hour}${hours}pm`
    }
    if (hour > 12) {
      cellContent = `${hour-12}${hours}pm`;
    }

    thEl.textContent = cellContent;
    row1.appendChild(thEl);
  }

  //  create the last column of the table head
  let thDltEl = document.createElement('th');
  thDltEl.textContent = 'Daily Location Total';
  row1.appendChild(thDltEl);
}

/*  render the footer row using header cells for the sumtotals  */
function renderFooter() {
  //  total each hour across stores
  let tableEl = document.getElementById('salesTable');
  let summedFooterEl = document.createElement('tfoot');
  tableEl.appendChild(summedFooterEl);

  let sumTotalsRow = document.createElement('tr');
  summedFooterEl.appendChild(sumTotalsRow);

  let tf1El = document.createElement('td');
  tf1El.setAttribute('id', 'boldme'); //  theres a first time for everything
  tf1El.textContent = 'Totals';
  sumTotalsRow.appendChild(tf1El);

  for (let storeId = 0; storeId < 15; storeId++){
    let sumRowEl = document.createElement('td');
    sumRowEl.textContent = allStoresSalesData[storeId];
    sumTotalsRow.appendChild(sumRowEl);
  }
}

function renderBody() {
  //  create TBODY element
  let tableEl = document.getElementById('salesTable');
  let reportBodyEl = document.createElement('tbody');
  tableEl.appendChild(reportBodyEl);

  for (let idx = 0; idx < cookieStores.length; idx++) {
    
    //  table data row, one for each location
    let reportRowEl = document.createElement('tr');
    reportBodyEl.appendChild(reportRowEl);

    let colHeader = document.createElement('th');
    colHeader.textContent = cookieStores[idx].location;
    reportRowEl.appendChild(colHeader);

    for (let idy = 0; idy < cookieStores[idx].hourlySales.length; idy++) {
      //  daily sale data cell content, one for each hour
      let hourTD = document.createElement('td');
      hourTD.textContent = cookieStores[idx].hourlySales[idy];
      reportRowEl.appendChild(hourTD);
    }

    //  daily location total, single cell, obj.totalSales property value
    let ttlSalesTD = document.createElement('td');
    ttlSalesTD.textContent = cookieStores[idx].totalSales;
    reportRowEl.appendChild(ttlSalesTD);
  }
}

/*  call all functions to populate the page */
function go() {
  new CookieStore('Seattle', 23, 65, 6.3);
  new CookieStore('Tokyo', 3, 24, 1.2);
  new CookieStore('Dubai', 11, 38, 3.7);
  new CookieStore('Paris', 20, 38, 2.3);
  new CookieStore('Lima', 2, 16, 4.6);
  populateAllStoresSalesData();
  renderHeader();
  renderBody();
  renderFooter();
}

/*  make all the things happen  */
go();