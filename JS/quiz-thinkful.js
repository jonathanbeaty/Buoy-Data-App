`use strict`;

const questionSet = [
{
    text: `What is Coercion?`,
    answers: [`Coercion is four equality operators: ==, ===, !=, and !==. The ! forms are of course the symmetric "not equal" versions of their counterparts; non-equality should not be confused with inequality.`,
    `Coercion comes in two forms in JavaScript: explicit and implicit. Explicit coercion is simply that you can see obviously from the code that a conversion from one type to another will occur, whereas implicit coercion is when the type conversion can happen as more of a non-obvious side effect of some other operation.`,
    `Coercion is where a var appears inside a scope, that declaration is taken to belong to the entire scope and accessible everywhere throughout.`,
    `Coercion is a way to "remember" and continue to access a function's scope (its variables) even once the function has finished running.`],
    correctAnswerIndex: 1
    
},

{
    text: `When buidling a program that will rely on complex usage pattern within your objects and prototypes, which is the best way to pass along object reference (.i.e. passing context around)? `,
    answers:[ `Implicitly using this, like fn() {return this.name.toUpperCase;}.`,
    `Explicitly using paraments, like fn(obj) {return obj.name.toUpperCase;}.`,
    `Using ES6 let and const over ES5 var.`,
    `Assigning variables within object literals and functions using dot notation.`],
     correctAnswerIndex: 0

},

{
    text: `Which built-in type was added in ES6?`,
    answers:[`null`,
    `undefined`,
    `boolean`,
    `symbol`],
    correctAnswerIndex: 3

},

{
    text: `Starting in ES6 function declarations that occur inside blocks {} are specified to be scoped to that block. Are these functions available outside the block? `,
    answers:[`Yes`,
    `No`,
    `Maybe`,
    `Maybe so`],
    correctAnswerIndex: 1


},

{
    text: `Generally speaking the new => arrow function introduced in ES6 are intended to be used for? `,
    answers:[`Long functions`,
    `Short inline function expressions`,
    `Long or short function expressions`,
    `Neither`],
    correctAnswerIndex: 1

},

{
    text: `When writing a JS program, what's the best way to organize your code?`,
    answers: [`In the order in which the program runs`,
    `All DOM manipulation at the top of the page to ensure it loads correctly`,
    `By event handlers, function calls, DOM manipulation, etc.`,
    `Alphabetically to help sorting`],
    correctAnswerIndex: 2

},

{
    text: `What is closure? `,
    answers: [`An inner function that has access to the outer (enclosing) function’s variables—scope chain. The closure has three scope chains: it has access to its own scope (variables defined between its curly brackets), it has access to the outer function’s variables, and it has access to the global variables`,
    `Are used when defining a function, they are the names created in the function definition`,
    `Closures in JavaScript are extremely versatile. Because of this, we can even pass a function as a parameter into another closure.`,
    `None of the above`],
    correctAnswerIndex: 0

},

{
    text: `What’s a typical use case for anonymous functions? `,
    answers: [`console.log("function(){}");`,
    `var squaredArray = inputArray.map(x => x * x);`,
    `for loop`,
    `$(array).split();`],
    correctAnswerIndex: 1

},

{
    text: `What is the bind() method?`,
    answers: [`Creates a new array with the results of calling a provided function on every element in the calling array`,
    `Splits a String object into an array of strings by separating the string into substrings, using a specified separator string to determine where to make each split`,
    `Iterates over all non-Symbol, enumerable properties of an object.`,
    `Creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called`],
    correctAnswerIndex: 3

},

{
    text: `What is event bubbling?`,
    answers: [`Event bubbling occurs when a user interacts with a nested element and the event propagates up (“bubbles”) through all of the ancestor elements.`,
    `Event bubbling occurs when a user interacts with a nested element and the event propagates up (“bubbles”) through all of the child elements.`,
    `Event bubbling occurs when a user interacts with a nested element and the event propagates up (“bubbles”) through all of the grandchildren elements.`,
    `Event bubbling occurs when a user interacts with a nested element and the event propagates up (“bubbles”) through all of the animal elements.`],
    correctAnswerIndex: 0

}

]

let quizQuestion = 1;
let correctAnswers = 0;

//Event Handlers

function handleEnterSite() {
    $('html').on('click', '#preloader-button', function() {
        $('#preloader').remove();
});
}

function handleRestartButton() {
    $('#last-page').on('click', '#restart-button', function() {
        $('#last-page').remove();
        quizQuestion = 1;
        correctAnswers = 0;
        nextQuestion();
});
}

function handleStartButton() {
    $('#start-page').on('click', '#js-start-button', function() {
        $('#start-page').remove();
        nextQuestion();
});
}

function handleSubmitButton1() {
    $('.bg').on('click', '.submitAnswer1', function(event) {
        event.preventDefault();
        let selectedAnswer = $('input:checked');
        let answer = selectedAnswer.val();
        runCheckAnswer(answer);
    
    });
}

function handleCorrectAnswerButton() {
    $('.bg').on('click', '#correct-answer-button', function() {
        $('#correctAnswerPage').remove();
        nextQuestion();
});
}

function handleIncorrectAnswerButton() {
    $('.bg').on('click', '#incorrect-answer-button', function() {
        $('#incorrectAnswerPage').remove();
        nextQuestion();
});
}

//DOM Manipulation

function quizTemplate(correctAnswers, question, answers) {
    return `
    <section id="questionPage" role="main">

    <h4 class="current-score">Question # ${answers} with ${correctAnswers} out of ${quizQuestion - 1} answered correctly so far......</h4>
    
    <h2 id="question">${question.text}</h2>

    <form id="questionForm">
        <fieldset>
            <legend id="legend">Please select one answer</legend>
        </fieldset>
    <button type=submit value="Submit" class="submitAnswer1">Submit</button>
    </form>

    <div id="answer"></div>
    </section>
    `;
    
}

function appendLabels() {
    let currentQuestion = questionSet[quizQuestion - 1];
    $("#legend").append("</br>");
    for(let i = 0; i < currentQuestion.answers.length; i++) {
        $("#legend").append(`<label><input type="radio" value="${currentQuestion.answers[i]}" name="answer" checked></input><span>${currentQuestion.answers[i]}</span></label></br>`);
    }
}

function correctAnswerPageTemplate() {
    return `
    <section id="correctAnswerPage" role="region">
    <h2>That is correct! Good work!</h2>
    <button type=submit value="Submit" id="correct-answer-button">Next Question</button>
    </section>
    `;
}

function incorrectAnswerPageTemplate(question) {
    return `
    <section id="incorrectAnswerPage" role="region">
    <h1>That is incorrect! Study more, you must</h1>
    </br>
    <h3>The correct answer was: ${question}</h3>
    <button type=submit value="Submit" id="incorrect-answer-button">Next Question</button>
    </section>
    `;
}

function lastPageTemplate(correctAnswers) {

    return `
    <section id="last-page">
    <p id="final-score">You scored ${correctAnswers} out of ${questionSet.length}. Your score: ${correctAnswers/questionSet.length * 100}%</p>
    <button type=submit value="Submit" id="restart-button">Restart</button>
    </section>
    `;

}

//Function calls

function nextQuestion() {

    //You need to change the below number to questionSet.number.length + 1
    if(quizQuestion === 11) {
        finalPage();
    }

    else {
  
    const question = questionSet[quizQuestion -1];
    const questionsAnswered = quizQuestion;

    $('#content').html(quizTemplate(correctAnswers, question, questionsAnswered));
    appendLabels();
    }
}

function runCorrectAnswerPage() {
    $("questionPage").remove();
    $('#content').html(correctAnswerPageTemplate());
    correctAnswers++;
    quizQuestion++;
}

function runIncorrectAnswerPage() {
    $("questionPage").remove();
    let correctAnswer = questionSet[quizQuestion -1].correctAnswerIndex;
    const question = questionSet[quizQuestion -1].answers[correctAnswer];
    $('#content').html(incorrectAnswerPageTemplate(question));
    quizQuestion++;
}

function runCheckAnswer(answer) {
    let correctAnswer = questionSet[quizQuestion -1].correctAnswerIndex;
    if(answer === questionSet[quizQuestion -1].answers[correctAnswer]) {
        runCorrectAnswerPage();
    }
    else {
        runIncorrectAnswerPage();
    }
}

function finalPage() {

    $('#content').html(lastPageTemplate(correctAnswers));
    handleRestartButton();
}

function handleButtons() {

    handleStartButton();
    handleSubmitButton1();
    handleEnterSite();
    handleCorrectAnswerButton();
    handleIncorrectAnswerButton();
}

//

handleButtons();




