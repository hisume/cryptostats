
const request = require('request-promise')  
const path = require('path');
const scheduler = require('node-schedule');
const db = require('./dbaccess')

function getCurrency(currencyPair) {

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
      console.log((JSON.parse(response)).data.amount);
      return Number(JSON.parse(response).data.amount);
      
    })
    .catch(function (err) {
      console.log(err);
    })
}

//add volotility
function createDBInsertJSON (tableName, date) {
  return {
    TableName: tableName,
    Item: {
      time: date.toLocaleString(),
      eth: {
        price: Number(getCurrency('ETH-USD'))
      },
      btc: {
        price: Number(getCurrency('BTC-USD'))
      },
      ltc: {
        price: Number(getCurrency('LTC-USD'))
      }
    }
  }
}

var j= scheduler.scheduleJob("* * * * *", () => {
  var date = new Date();
  console.log(date.toLocaleString());
  var json= createDBInsertJSON("Music",date)

  //getCurrency('BTC-USD');
 // getCurrency('ETH-USD');
 // getCurrency('LTC-USD');
})
console.log("jobs scheduled");