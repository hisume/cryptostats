const db = require('./app/dbaccess')
var fs = require('fs')
var json2csv = require('json2csv');

$s=new Date("7/25/17").toISOString()
$e=new Date("8/4/17").toISOString()
db.getDateRangeData("BTC-USD", $s, $e, function (data) {

    var fields= ['currencyPair','value','time']
    var csv = json2csv({ data: data.Items, fields: fields });
    
    fs.writeFileSync('crypto.csv', csv)
    
    console.log("finished writing file")
    process.exit()
});
