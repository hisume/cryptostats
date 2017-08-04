var aws = require("aws-sdk");
var fs = require('fs')

aws.config.loadFromPath("./.keyaws.json")

var docClient = new aws.DynamoDB.DocumentClient();
const tableName="cryptoDB"

module.exports = {
    addKeyToTable: function (json) {
        docClient.put(json, function (err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
             //   console.log("Added item:", JSON.stringify(data, null, 2));
            }
        });

    },
    getDateRangeData(currencyPair, startDate, endDate, callBack) {
        var params= {
            TableName: tableName,
            KeyConditionExpression: "#cp = :cp and #t between :startDate and :endDate",
            ExpressionAttributeNames: {
                "#t": "time",
                "#cp":"currencyPair"
            },
            ExpressionAttributeValues: {
                ":startDate": startDate,
                ":endDate": endDate,
                ":cp" : currencyPair
            }
        }
        
       docClient.query(params, (err, data)=> {
            if (err) {
                console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
                return null
            }       
            else {      
                /*
                var file = fs.createWriteStream('test.txt');
                data.Items.forEach((v)=> {
                    file.write(JSON.stringify(v)+"\n")
                });
                file.end();
                */
                callBack(data);
            }
        });
    }


};

/*
        docClient.query(params, (err, data)=> {
            if (err) {
                console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
                return null
            }       
            else {
                return data.items
            }
        }).
        */