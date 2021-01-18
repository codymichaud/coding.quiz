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


