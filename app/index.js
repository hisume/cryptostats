
const request = require('request-promise')  
const path = require('path');
const scheduler = require('node-schedule');
const db = require('./dbaccess')
const tableName="cryptoDB"

function processNewCurrencyPoint(currencyPair, ISODate) {

  const options= {
    method: 'GET',
    uri: 'https://api.coinbase.com/v2/prices/'+currencyPair+'/spot',
    qs: {
      currency: 'usd'
    },
    headers: {
      'user-agent': 'request',
      'CB-VERSION': '2017-07-21'
    }
  }

  request(options)  
    .then(function (response) {
      console.log(currencyPair + " "+(JSON.parse(response)).data.amount);
      let j = createInsertJSON(tableName,ISODate, currencyPair, Number(JSON.parse(response).data.amount));
      db.addKeyToTable(j);
      
    })
    .catch(function (err) {
      console.log(err);
    })
}

//add volatility
function createInsertJSON (tableName, ISODate, currencyPair, value ) {
  return {
    TableName: tableName,
    Item: {
      currencyPair: currencyPair,
      time: ISODate,
      value: value
    }
  }
}

var j= scheduler.scheduleJob("* * * * *", () => {
var dTemp= new Date();
var ISODate = new Date((dTemp).getTime() - (dTemp.getTimezoneOffset() * 60000)).toISOString();
  console.log(dTemp.toLocaleString());
  processNewCurrencyPoint('BTC-USD', ISODate)
  processNewCurrencyPoint('ETH-USD', ISODate)
  processNewCurrencyPoint('LTC-USD', ISODate)

})

console.log("jobs scheduled");