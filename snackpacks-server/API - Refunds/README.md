# Let's learn about the Refunds API!!!!

## What's in the database?
* orderID int
* userID int
* reason string
* amount double
* status int
    * 0 -> refund has not been resolved
    * 1 -> refund has been resolved
    * 2 -> refund has been rejected

## Methods in refundConnector.js
* `getRefunds`
    * no arguments
    * returns a list of all the refunds as an array of `refund` objects
    * tested: ryan
* `getRefundByOrderID`
    * takes `orderID` as int
    * returns `refund` object
    * tested: ryan
* `addRefundCase`
    * takes `orderID` (int), `userID` (int), `reason_str` (string), `amount` (double)
    * returns `true`
    * tested: ryan
* `setRefundStatus`
    * takes `orderID` (int), `status` (int, 0 or 1)
    * returns true if successful
    * returns "ERROR: ORDERID NOT FOUND" if `orderID` not found
    * tested: ryan
* `checkRefundStatus`
    * takes in `orderID` int
    * returns `1` if order is pending, `2` if order has been refunded
    * tested

