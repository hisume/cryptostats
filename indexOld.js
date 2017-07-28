
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
function createDBInsertJSON (tableName, date, currencyType, value ) {
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

var params = {
    TableName : "Movies",
    ProjectionExpression:"#yr, title, info.genres, info.actors[0]",
    KeyConditionExpression: "#yr = :yyyy and title between :letter1 and :letter2",
    ExpressionAttributeNames:{
        "#yr": "year"
    },
    ExpressionAttributeValues: {
        ":yyyy":1992,
        ":letter1": "A",
        ":letter2": "L"
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.year + ": " + item.title
            + " ... " + item.info.genres
            + " ... " + item.info.actors[0]);
        });
    }
});
