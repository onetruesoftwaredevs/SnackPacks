# The SnackPacks-Server Suite!
By Ryan Chen

Below is a list of all the classes in snackpacks-server and the attributes they have. All are get-able and set-able unless expressly stated.

## Snack.js
### Attributes
* int id (ex. 0)
* string name (ex. "candy corn")
* double price (ex. 4.99)
* int calories (ex. 100)
* string allergens (ex. "dairy,gluten")

## Snackpack.js
### Attributes
* int id (ex. 0)
* string name (ex. "doritos legends")
* string contents (ex. "doritos,beer,mountain dew")
* string allergens (ex. "dairy,gluten")
* string image_path (ex. "www.google.com/hello.png")
* string reviews (ex. "")
* double cost (ex. 4.99)

## SnackConnect.js
### Attributes
* string host
* string user
* string password
* int port
### Methods
* constructor

        Requires a host, username, password and port number. All are provided in the class.
    
        Future plans: use environment variables

* list getSnackPacks(callback)

        Returns a list of all SnackPack objects listed in the database.

        Future plans: none
* SnackPack getSnackPackByID(id, callback)

        Takes in an ID as a parameter and returns the SnackPack object using data returned from the database.

        Future plans: none
* bool createSnackPack(name, contents, allergens, image_path, reviews, cost, callback)

        Takes in all the attributes needed for a SnackPack object to be constructed and inserts them into the database.

        Future plans: none
* list getSnacks(callback)

        Returns a list of all snacks in the snack database.

        Future plans: none
* double getCartCost(cart, callback)

        Takes in a list of pairs (id, quantity) and returns the total cost of the items specified in the list as a double.

        Future plans: none
* void getSnackPackByID(id, callback)

        Deletes the SnackPack specified by the id given by the user.

        Future plans: none