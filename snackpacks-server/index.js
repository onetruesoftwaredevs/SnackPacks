var SnackPack = require('./snackpack');
var SnackUser = require('./snackUser');

exports.handler = async (event) => {
    var sp = new SnackPack(1, "Testing SnackPack", ["Food"], ["Allergens"], "", "", 20)
    const response = {
        statusCode: 200,
        body: sp.json();
    };
    return response;
};
