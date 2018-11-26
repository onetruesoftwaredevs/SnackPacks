# Let's learn about the Backlist API!!!!

## What's in the database?
* `userID` int
* `reason` string
* `status` int
    * 0 -> case still pending
    * 1 -> user been banned
    * 2 -> user not banned

## Methods in blackListConnector.js
* `getBlackListedUsers`
    * get all cases
    * no arguments
    * returns a list of all cases in the blackList databae as an array of `blackListUser` objects
    * tested: ryan
* `getBlackListedUserByID`
    * get a certain entry in the blacklist database by sepcifying ID
    * takes `userID` (int)
    * returns the user specified by the userID as a `blackListUser` object
    * tested: none
* `reportBlackListedUser`
    * add case to the blacklist database
    * takes `userID` (int), `reasonStr` (string)
    * returns `true` if all goes well, error if there are problems
    * tested: ryan
* `setBlackListUserStatus`
    * sets the status of a certain blacklist database entry
    * takes `userID` (int), `status` (int)
    * returns `true` if all goes well, error if there are problems. if status isn't between 0 and 2 or not a number, will return error. likewise if `userID` doesn't exist in database
    * tested: ryan
* `checkUserStatus`
    * takes `userID` int
    * returns `0` if user not found, `1` if case is pending, `2` if user has been banned, `3` if marked for deletion from database
    * tested: ryan
* `cleanDatabase`
    * delete all entries in the database that have status marked as 3
    * no arguments
    * returns true if all goes, returns errors
    * tested: none

