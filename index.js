var SnackPack = require('./snackpacks-server/src/snackpack.js');
var SnackUser = require('./snackpacks-server/src/snackUser.js');

exports.handler = async (event) => {
    var sp = new SnackPack(1, "Testing SnackPack", "Food", "Allergens", "", "", 20)
    const response = {
        statusCode: 200,
        body: sp
    };
    return response;
};
