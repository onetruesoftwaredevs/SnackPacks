# Let's learn about the Drivers API!!!

Disclaimer: Though this is named the Drivers API, it's more about what Drivers can control than controlling the Drivers. This API uses the `Orders` table in the `snackpacks` database.

## What's in the Orders Database?
* `id` (int)
* `paymentInfo` (string)
* `recipient` (string)
* `address` (string)
* `driver` (string)
* `subtotal` (double)
* `tax` (double)
* `total` (double)
* `status` (string)
* `time_left` (int)
* `loc_x` (float)
* `loc_y` (float)

## Variables in orderConnect.js
* enum

## Methods in orderConnect.js
* `getOrders`
    * get all orders
    * takes no arguments
    * return a list of all orders as an array of `Order` objects
    * tested: ryan
* `claimOrder`
    * allows a driver to claim an order given a driver_id
    * takes `order_id` (int), `driver_id` (int)
    * returns true if all goes well
    * tested: ryan
* `updateLocation`
    * updates the x and y of a specific order given an order_id and longitutde and latitude coordinates
    * takes `orderID` (int), `longitude` (float), `latitude` (float)
    * returns true if all goes well
    * tested: ryan
* `getLocationByID(id)`
    * gets the location of an order given an `orderID`
    * takes `orderID` (int)
    * returns a JSON object with `x` and `y` attributes
    * tested: ryan
* `getOrderbyID`
    * returns an order object that is specified by an `orderID`
    * takes `orderID` (int)
    * returns the orderID object specified
    * tested: ryan
* `createOrder`
    * adds an order  to the database
    * takes `id` (int), `cart` (string), `recipient` (string), `paymentInfo` (string), `address` (string), `driver` (string), `subtotal` (double), `tax` (double), `total` (double), `status` (double)
    * returns true if all goes well
    * tested: ryan
* `editOrderByID`
    * edits order according to the `JSON` object provided
    * takes `id` (int), `orderJSON` (JSON)
    * returns true if all goes well, error if ID not found
    * tested: ryan
* `deleteOrderByID`
    * deletes an order given an ID
    * takes `id` (int)
    * returns true if all goes well
    * tested: ryan
* `setOrderStatus`
    * modifies the status of the order specified
    * takes `orderID` (int), `status` (int)
    * returns true if all goes well, will let you know if there's an error
    * tested: none