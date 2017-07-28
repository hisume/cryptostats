var aws = require("aws-sdk");

aws.config.loadFromPath("./.keyaws.json")

var docClient = new aws.DynamoDB.DocumentClient();

module.exports = {
    addKeyToTable: function (json) {
        docClient.put(json, function (err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Added item:", JSON.stringify(data, null, 2));
            }
        });

    }
};

