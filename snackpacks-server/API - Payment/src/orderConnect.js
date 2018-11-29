var mysql = require('mysql');
class OrderConnector{
    constructor(){
            this.host = "snackpacksdb.cawigtgndeba.us-east-2.rds.amazonaws.com";
            this.user = "snackpacks";
            this.password = "e7p$yYzRa&RR_46u";
            this.port = 3306;
        }

    createOrder(id, cart, recipient, paymentInfo, address, driver, subtotal, tax, total, status){
        return new Promise((resolve, reject) => {
            var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});

            var cartString="[";

            //Create cartstring in the form: [{"0":1},{"1",2}]
            for(var i=0; i<cart.length; i++){
                // console.log("key: "+cart[i].key+" quantity: "+cart[i].quantity);
                cartString+=`\{\"${cart[i].key}\":${cart[i].quantity}\},`;//Append item.key to cartString
            }
            cartString=cartString.substr(0,cartString.length-1);//Remove trailing comma from cartString
            cartString+="]";
            console.log(cartString);
            return;

            //Start the descent into callback hell
            connection.connect(function(err) {
                if (err) reject(err);
                //callback to send query
                //Instead of trying to iterate thru an array
                connection.query(`SELECT id FROM snackpacks.Orders ORDER BY id DESC LIMIT 0, 1`, function(err, count_result, fields) {
                    if (err) reject(err);
                    var index = count_result[0]["id"] + 1;
                    connection.query(`INSERT INTO snackpacks.Orders VALUES(${index},'${cart}', "${paymentInfo}", "${recipient}", "${address}", "${driver}", ${subtotal}, ${tax}, ${total}, "${status}", 30, 0, 0)`, function(err, result, fields){
                        if (err) reject(err);
                        console.log(index);
                        //callback to end connection
                        connection.end(function(err) {
                            if (err) reject(err);
                            resolve(true);
                        });
                    });
                });
            });
        });
    }
}
module.exports=OrderConnector;

