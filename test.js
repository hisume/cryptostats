const db = require('./app/dbaccess')
var fs = require('fs')

$s=new Date("7/31/17").toISOString()
$e=new Date("8/2/17").toISOString()
db.getDateRangeData("BTC-USD", $s, $e, function (data) {

    var file = fs.createWriteStream('test.txt');
    data.Items.forEach((v)=> {
        file.write(JSON.stringify(v)+"\r\n")
    });
    file.end();

});
