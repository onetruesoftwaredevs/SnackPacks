var refundDB = require('./refundConnector')

var refundConnector = new refundDB();

// refundConnector.getRefunds()
//     .then(data => console.log(data))
//     .catch(error => console.log(error));

refundConnector.checkRefundStatus(3)
    .then(data => console.log(data))
    .catch(error => console.log(error));