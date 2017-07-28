
const request = require('request-promise')  
const path = require('path');
const scheduler = require('node-schedule');
const db = require('./dbaccess')
const tableName="cryptoDB"

function processCurrency(currencyPair, ISODate) {

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
  console.log(dtemp.toLocaleString());
  processCurrency('BTC-USD', ISODate)
  processCurrency('ETH-USD', ISODate)
  processCurrency('LTC-USD', ISODate)

})

console.log("jobs scheduled");