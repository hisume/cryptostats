var aws = require("aws-sdk");

aws.config.loadFromPath("./.keyaws.json")

var docClient = new aws.DynamoDB.DocumentClient();

function addKey (json) {
  docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
}); 

};

var params = {
    TableName:"Music",
    Item:{
        "Year": "1113",
        "SongTitle": "js1title1",
        "Artist":"a1rtistA1"
    },
      ReturnConsumedCapacity: "TOTAL"
};

addKey(params);

/*

Date
  eth
  btc
  ltc


*/