
const request = require('request-promise')  
const path = require('path');
const scheduler = require('node-schedule');

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


var j= scheduler.scheduleJob("* * * * *", () => {
  console.log((new Date).toLocaleString());
  getCurrency('BTC-USD');
  getCurrency('ETH-USD');
  getCurrency('LTC-USD');
})
console.log("jobs scheduled");