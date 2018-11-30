var mysql = require('mysql');
class OrderConnector{
    constructor(){
            this.host = "snackpacksdb.cawigtgndeba.us-east-2.rds.amazonaws.com";
            this.user = "snackpacks";
            this.password = "e7p$yYzRa&RR_46u";
            this.port = 3306;
        }

    createOrder(id, cart, recipient, paymentInfo, address, driver, subtotal, tax, total, status){
        console.log("in createOrder");
        return new Promise((resolve, reject) => {
            var connection = mysql.createConnection({host:this.host, user:this.user, password:this.password, port:this.port});

            var cartString="[";

            console.log("cart");
            console.log(JSON.stringify(cart));
            //Create cartstring in the form: [{"0":1},{"1",2}]
            for(var i=0; i<cart.length; i++){
                // console.log("key: "+cart[i].key+" quantity: "+cart[i].quantity);
                cartString+=`\{\"${cart[i].key}\":${cart[i].quantity}\},`;//Append item.key to cartString
            }
            cartString=cartString.substr(0,cartString.length-1);//Remove trailing comma from cartString
            cartString+="]";
            console.log(cartString);

            //Start the descent into callback hell
            connection.connect(function(err) {
                if (err){
                    reject(err);
                    return;
                }
                //callback to send query
                //Instead of trying to iterate thru an array
                connection.query(`SELECT id FROM snackpacks.Orders ORDER BY id DESC LIMIT 0, 1`, function(err, count_result, fields) {
                    if (err){
                        reject(err);
                        return;
                    }
                    var index = count_result[0]["id"] + 1;
                    connection.query(`INSERT INTO snackpacks.Orders VALUES(${index},'${cartString}', "${paymentInfo}", "${recipient}", "${address}", "${driver}", ${subtotal}, ${tax}, ${total}, "${status}", 30, 0, 0)`, function(err, result, fields){
                        console.log("done with query, result:");
                        console.log(result);
                        if (err){
                            reject(err);
                            return;
                        }
                        console.log("index: "+index);
                        //callback to end connection
                        connection.end(function(err) {
                            if (err){
                                reject(err);
                                return;
                            }
                            console.log("resolving true");
                            resolve(true);
                        });
                    });
                });
            });
        });
    }
}
module.exports=OrderConnector;

