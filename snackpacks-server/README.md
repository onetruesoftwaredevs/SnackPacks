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
##### Get snackpacks
* Method: GET
* QueryString: command=list
* Header: NA
* Body: NA

* Return: JSON Array of SnackPack JSON Objects

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

##### Delete Orders
* Method: DELETE
* QueryString: command=delete
* Header: NA
* Body: NA

* Return: true/false

### __/admin__
##### Create SnackPack
* Method: POST
* QueryString: command=add
* Header: NA
* Body: SnackPack JSON, with name, contents, allergens, image_path, reviews, cost, and rating. Note that the Array values must be strings delimited by commas.

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
