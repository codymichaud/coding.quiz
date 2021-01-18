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
allScores = JSON.parse(allScores);

if (allScores !== null) {
    for (var i = 0; i < allScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].userScore;
        highScores.appendChild(createLi);

    }
}

//event listener to listen for users click to return to index page
goBack.addEventListener("click", function () {
    window.location.replace("./index.html")
})