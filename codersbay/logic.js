/* global moment firebase */

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBo4i2IZ7lMqIUh6HJWsK867JHj9-y1Y5E",
  authDomain: "my-second-firebase-proje-22148.firebaseapp.com",
  databaseURL: "https://my-second-firebase-proje-22148.firebaseio.com",
  projectId: "my-second-firebase-proje-22148",
  storageBucket: "my-second-firebase-proje-22148.appspot.com",
  messagingSenderId: "340132977503",
  appId: "1:340132977503:web:5f079af911a5f05486f4ea"
};

firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Initial Values
var highPrice = 0;
var highBidder = "No one :-(";

// --------------------------------------------------------------

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function(snapshot) {

  // If Firebase has a highPrice and highBidder stored, update our client-side variables
 if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {
  //if (snapshot.val().highBidderz && snapshot.val().highPrice) {
      // Set the variables for highBidder/highPrice equal to the stored values.
    highBidder = snapshot.val().highBidder;
    highPrice = parseInt(snapshot.val().highPrice);
    alert("yaas")
  }

  // If Firebase does not have highPrice and highBidder values stored, they remain the same as the
  // values we set when we initialized the variables.
  // In either case, we want to log the values to console and display them on the page.
  console.log(highBidder);
  console.log(highPrice);
  $("#highest-bidder").text(highBidder);
  $("#highest-price").text(highPrice);

  // If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid

$("#submit-bid").on("click", function(event) {
  event.preventDefault();
  // Get the input values
  var bidderName = $("#bidder-name").val().trim();
  var bidderPrice = parseInt($("#bidder-price").val().trim());

  // Log the Bidder and Price (Even if not the highest)
  console.log(bidderName);
  console.log(bidderPrice);

  if (bidderPrice > highPrice) {

    // Alert
    alert("You are now the highest bidder.");

    // Save the new price in Firebase. This will cause our "value" callback above to fire and update
    // the UI.
    database.ref().set({
      highBidder: bidderName,
      highPrice: bidderPrice
    });

    // Log the new High Price
    console.log("New High Price!");
    console.log(bidderName);
    console.log(bidderPrice);
  }

  else {

    // Alert
    alert("Sorry that bid is too low. Try again.");
  }
});
