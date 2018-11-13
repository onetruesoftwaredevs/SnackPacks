var Review = require("./review");
var reviewDB = require("./reviewConnect");

reviewConnector = new reviewDB();

// console.log("Test 1: Get all")
// reviewConnector.getReviews()
//     .then(data => console.log(data))
//     .catch(error => console.log(error));

// console.log("Test 2: Get by ID")
// reviewConnector.getReviewByID(0)
// .then(data => console.log(data))
// .catch(error => console.log(error));

// console.log("Test 3: Get a few by ID")
// reviewConnector.getReviewsByIDs([0, 2])
//     .then(data => console.log(data))
//     .catch(error => console.log(error));

// console.log("Test 4: Create a review")
// reviewConnector.createReview("Nicole Dwenger", "I don't like SnackPacks", 0, "This has been an integral part of my life.")
//     .then(data => console.log(data))
//     .catch(error => console.log(error));

// console.log("Test 5: Delete a review by ID")
// reviewConnector.deleteReviewByID(3)
//     .then(data => console.log(data))
//     .catch(error => console.log(error));