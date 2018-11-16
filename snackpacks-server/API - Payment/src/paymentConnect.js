//paymentConnect.js
//NODEJS ES5
//Purpose: abstract the process of working with the database

//Required libraries
var mysql=require('mysql');

class PaymentConnector{
    //snackConnector constructor
    constructor(){
        this.host="snackpacksdb.cawigtgndeba.us-east-2.rds.amazonaws.com";
        this.user="snackpacks";
        this.password="e7p$yYzRa&RR_46u";
        this.port=3306;
    }

    getCartCost(cart){
        //"cart":[{"key":0,"quantity":6},{"key":3,"quantity":10}]}
        return new Promise((resolve,reject)=>{
            var connection=mysql.createConnection({
                host:this.host,
                user:this.user,
                password:this.password,
                port:this.port
            });

            //Create the cart string used for the SQL command
            var cartString="(";

            console.log("cart from connector: "+cart);
            //Create array of items in the cart in the form: [[KEY, QUANTITY],...]
            var newCart=[];
            for(var i=0; i<cart.length; i++){
                console.log("key: "+cart[i].key+" quantity: "+cart[i].quantity);
                newCart.push([cart[i].key,cart[i].quantity]);//Add [KEY,QUANTITY] to array
                cartString+=`\"${cart[i].key}\",`;//Append item.key to cartString
            }
            console.log("newCart: "+newCart);
            cartString=cartString.substr(0,cartString.length-1);//Remove trailing comma from cartString
            cartString+=")";
            console.log(cartString);

            //Start the descent into callback hell
            connection.connect(function(err){
                if(err){
                    reject(err);
                    return;
                }
                //callback to send query
                //Instead of trying to iterate thru an array
                connection.query(`SELECT cost FROM snackpacks.snackpacks WHERE id IN ${cartString}`,function(err,result,fields){
                    if(err){
                        reject(err);
                        return;
                    }
                    //callback to end connection
                    connection.end(function(err){
                        var total_cost=0;
                        for(var x in result){
                            console.log(`${result[x]['cost']} * ${newCart[x][1]}`);
                            total_cost+=(result[x]['cost']*newCart[x][1]);
                        }
                        console.log("total cost: "+total_cost);
                        resolve(total_cost);
                    });
                });
            });
        }).catch(function(error){
            console.log(error);
        });
    }
}

//Allows module to be exposed
module.exports=PaymentConnector;