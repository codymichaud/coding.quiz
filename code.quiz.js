//5 questions 20 points each
//Lose 5 points or seconds for each wrong answer

var quizQuestions = [
    {
        question: "Arrays in Javascript can be used to store ______:",
        choices: ["Numbers and strings", "Other arrays", "Booleans", "All of the above"],
        answer: "All of the above"

    },
    {
        question: "What is a very useful tool that is used during development, debugging and for printing content to the debugger:",
        choices: ["Javascript", "Terminal / bash", "For loops", "console.log()"],
        answer: "console.log()"
    },
    {
        question: "The condition in an if/else statement is enclosed within ____.",
        choices: ["Quotes", "Curly brackets", "Parentheses", "Square brackets"],
        answer: "Parentheses"
    },
    {
        question: "What does CSS stand for:",
        choices: ["Code Style Sheet", "Cascading Style Sheet", "Coding Scripted Style", "Cryptic Styling Sheet"],
        answer: "Cascading Style Sheet"
    },
    {
        question: "String Values must be enclosed within ____ when being assigned to variables.",
        choices: ["Commas", "Curly brackets", "Quotes", "Parenthesis"],
        answer: "Quotes"
    },
];
//Declared var for userScore and questionsIndex
var userScore = 0;
var questionIndex = 0;

var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startQuiz");
var questionsDiv = document.querySelector("#questionsDiv");
var container = document.querySelector("#container");

//Timer of 20 seconds per questions
var secondsLeft = 100;
//Holds interval time
var holdInterval = 0;
//Holds penalty time
var penalty = 5;
//Creates new element for ul choices list
var ulCreate = document.createElement("ul");

//When start quiz button clicked starts timer
timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = " Time's up!!";
            }
        }, 1000);
    }
    render(questionIndex);
});

//Displays questions and choices on to page
function render(questionIndex) {
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    //For loop to loop through the info int he array
    for (var i = 0; i < quizQuestions.length; i++) {
        //Appends the question title only
        var userQuestion = quizQuestions[questionIndex].question;
        var userChoices = quizQuestions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    // New ul for each question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
//event to compare choices with the answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        //Correct answer condition
        if (element.textContent == quizQuestions[questionIndex].answer) {
            userScore++;
            createDiv.textContent = "You got it!! The answer is:  " + quizQuestions[questionIndex].answer;

        } //Wrong answer condition
        else {
            //Will deduct 5 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong answer!! The correct answer is:  " + quizQuestions[questionIndex].answer;
        }
    }
    //Determines what question the user is on
    questionIndex++;

    if (questionIndex >= quizQuestions.length) {
        //allDone will append the user stats on the last page
        allDone();
        createDiv.textContent = "You finished the quiz!!" + " " + "You got  " + userScore + "/" + quizQuestions.length + "correct!!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);


}
//appends last page
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    //Heading for end of quiz
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!!"

    questionsDiv.appendChild(createH1);

    //Paragraph for end of quiz
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    //Calculates the remaining time and replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;
        questionsDiv.appendChild(createP2);
    }
    //Label asking to enter intials
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your intials for your score: ";

    questionsDiv.appendChild(createLabel);

    //Allows user to input intials into label
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    //Allows user to submit their score with their initials to the high score sheet
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    //Adding event listener that will capture initials and local storage intitials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {
            console.log("Dont forget your intials");

        } else {
            var finalScore = {
                initials: initials,
                userScore: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            //Sends user to final page
            window.location.replace("./highScores.html")
        }
    });

}


