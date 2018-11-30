# Using the SnackPack API

## Parts of an HTTP Request
##### Method
For this API, you will exclusively use GET, POST, PATCH, and DELETE. Please note DELETE requires proper authentication which has not yet been added in Sprint 2. For this sprint, please replace DELETE methods with GET.

##### QueryString
These variables will be passed in with the URL as key value pairs, see examples

`www.google.com?query=string`

`wwww.cs.purdue.edu/homes/cs252?failing=true&death=true`

##### Headers
Headers are not currently used in this iteration of the API, however they are added to the request if used.

##### Body
For POST and PATCH, the body is used to send additional information in the form of a JSON. Note that this will be tied to the request as you build your request during execution.

## Using the APIS
### https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/

### __/snackpacks__
##### Get SnackPacks
    * Method: GET
    * QueryString: command=list
    * Header: NA
    * Body: NA

    * Return: JSON Array of SnackPack JSON Objects
    
##### Rate SnackPacks
    * Method: POST
    * QueryString: command=rate&id={SNACKPACK_ID}
    * Header: NA
    * Body: JSON with key "rating" and int value between 1 - 5.

    * Return: true/false
    
##### Review SnackPacks
    * Method: POST
    * QueryString: command=review&id={SNACKPACK_ID}
    * Header: NA
    * Body: JSON with key "name", "rating", "title", and "review" keys.
    
    "body": {
      "name": "Steve",
      "rating": 3,
      "title": "This could've been better",
      "review": "He was aight"
    }
    
    * Please note that this rating does not influence SnackPack rating

    * Return: true/false
    
##### Upvote
    * Method: GET
    * QueryString: command=upvote&id={SNACKPACK_ID}&rev={REVIEW_INDEX}
    * Header: NA

    * Return: true/false
    
##### Downvote
    * Method: GET
    * QueryString: command=downvote&id={SNACKPACK_ID}&rev={REVIEW_INDEX}
    * Header: NA

    * Return: true/false
    
### __/snacks__
##### Get Snacks
    * Method: GET
    * QueryString: command=list
    * Header: NA
    * Body: NA

    * Return: JSON Array of Snack JSON Objects

### ____/drivers__
##### Get Orders
    * Method: GET
    * QueryString: command=list
    * Header: NA
    * Body: NA

    * Return: JSON Array of Order JSON Objects

##### Get Own Orders
    * Method: GET
    * QueryString: command=own&id={DRIVER_ID}
    * Header: NA
    * Body: NA

    * Return: JSON Array of Order JSON Objects

#### Claim Orders
    * Method: PATCH
    * QueryString: command=edit&orderId={ORDER_ID}&driverId={DRIVER_ID}
    * Header: NA
    * Body: JSON of values, where non-edited fields are NULL, and edited fields have their new value. See example:

    "body": {
        "_recipient": "meep",
        "_paymentInfo": null,
        "_address": "Alpher Sigmer Per",
        "_driver": "0",
        "_subtotal": null,
        "_tax": null,
        "_total": null
      }

    * Return: true/false
    
##### Create Order
    * Method: POST
    * QueryString: command=add
    * Header: NA
    * Body: Order JSON, with cart, recipient, paymentInfo,
    address, driver, subtotal, tax, and total.
    Note that the Array values must be strings delimited by commas.

    * Return: true/false

#### Update Orders
    * Method: PATCH
    * QueryString: command=edit&id={ORDER_ID}
    * Header: NA
    * Body: JSON of values, where non-edited fields are NULL, and edited fields have their new value. See example:

    "body": {
        "_recipient": "meep",
        "_paymentInfo": null,
        "_
        
      ress": "Alpher Sigmer Per",
        "_driver": "0",
        "_subtotal": null,
        "_tax": null,
        "_total": null
      }

    * Return: true/false

##### Delete Orders
    * Method: DELETE
    * QueryString: command=delete&id={ORDER_ID}
    * Header: NA
    * Body: NA

    * Return: true/false

##### Update Location
    * Method: POST
    * QueryString: command=updateloc&id={DRIVER_ID}
    * Header: NA
    * Body: NA

    * Return: Stringified JSON with keys lat and long
    
##### Get Location
    * Method: GET
    * QueryString: command=getloc&id={DRIVER_ID}
    * Header: NA
    * Body: NA

    * Return: "body": "{\"lat\":{LATITUDE},\"long\":{LONGITUDE}}"

### __/admin__
##### Create SnackPack
    * Method: POST
    * QueryString: command=add
    * Header: NA
    * Body: SnackPack JSON, with name, contents, allergens,
    image_path, reviews, cost, and rating. Note that the Array
    values must be strings delimited by commas.

    * Return: true/false

##### Delete SnackPacks
    * Method: DELETE
    * QueryString: command=delete&id={SNACKPACK_ID}
    * Header: NA
    * Body: NA

    * Return: true/false

### __/admin/drivers__
##### List Drivers
    * Method: GET
    * QueryString: command=list
    * Header: NA
    * Body: NA

    * Return: JSON Array of Driver JSON Objects

##### Add Driver
    * Method: POST
    * QueryString: command=add
    * Header: NA
    * Body: Driver JSON, with name, phone, carmodel, carmake.

    * Return: true/false

##### Delete Drivers
    * Method: DELETE
    * QueryString: command=list&id={DRIVER_ID}
    * Header: NA
    * Body: NA

    * Return: true/false
    
##### Rate Drivers
    * Method: POST
    * QueryString: command=rate&id={DRIVER_ID}
    * Header: NA
    * Body: JSON with key "rating" and int value between 1 - 5.

    * Return: true/false
    
##### Review Drivers
    * Method: POST
    * QueryString: command=review&id={DRIVER_ID}
    * Header: NA
    * Body: JSON with key "name", "rating", "title", and "review" keys.
    
    "body": {
      "name": "Steve",
      "rating": 3,
      "title": "This could've been better",
      "review": "He was aight"
    }
    
    * Please note that this rating does not influence driver rating

    * Return: true/false
    
 ### __/blacklist__
##### List Banned Users
    * Method: GET
    * QueryString: command=list
    * Header: NA
    * Body: NA

    * Return: JSON Array of Blacklist User JSON Objects
    
##### List Banned User by ID
    * Method: GET
    * QueryString: command=listById&id={USER_ID}
    * Header: NA
    * Body: NA

    * Return: JSON of Blacklist User JSON Object or null if no user exists
    
##### Add Report
    * Method: POST
    * QueryString: command=addReport
    * Header: NA
    * Body: JSON with key "reason" with string value

    * Return: true/false

##### Set Status
    * Method: GET
    * QueryString: command=setStatus&status={INT}
    * Header: NA
    * Body: NA

    * Return: true/false
    
##### Get Status
    * Method: GET
    * QueryString: command=checkStatus&id={INT}
    * Header: NA
    * Body: NA

    * Return: true/false
   
##### Clear Blacklisted Users
    * Method: GET
    * QueryString: command=clear
    * Header: NA
    * Body: NA

    * Return: true/false
