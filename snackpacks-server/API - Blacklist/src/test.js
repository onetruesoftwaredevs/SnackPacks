var blackListDB = require('./blackListConnect');

var blackListConnector = new blackListDB();
// blackListConnector.getBlackListedUsers()
//     .then(data => console.log(data))
//     .catch(error => console.log(error));

// blackListConnector.setBlackListUserStatus(47, 0)
//     .then(data => console.log(data))
//     .catch(error => console.log(error));

// blackListConnector.reportBlackListedUser(5, "Was very rude to driver.")
//     .then(data => console.log(data))
//     .catch(error => console.log(error));

blackListConnector.checkUserStatus(5)
    .then(data => console.log(data))
    .catch(error => console.log(error));