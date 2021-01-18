// var for high score page
var highScores = document.querySelector("#highScores");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

//Event listener to clear scores on click
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
//Retrieves scores the are stored in local storage
var allScores = localStorage.getItem("allScores");