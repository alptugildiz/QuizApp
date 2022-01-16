const checkbox = document.getElementById('checkbox');

eventListeners();

function eventListeners(){
    checkbox.addEventListener('change',changeTheme)
}

function Question(text,choices,answer){
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

// Question prototype
Question.prototype.checkAnswer = function(answer){
    return this.answer === answer;
}

// Quiz Constructor
function Quiz(questions){
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0
}

// Quiz Prototype
Quiz.prototype.getQuestion = function(){
    return this.questions[this.questionIndex];
}

// Quiz isFinish
Quiz.prototype.isFinish = function(){
    return this.questions.length === this.questionIndex;
}

// Quiz guess
Quiz.prototype.guess = function(answer){
    var question = this.getQuestion();

    if(question.checkAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
}


var q1 = new Question("What is Japanese sake made from ?",["Pinaple","Rice","Rock","Orange"],"Rice");

var q2 = new Question("How many teeth does an adult human have ?",["32","25","22","26"],"32");

var q3 = new Question("Who discovered Penicillin ?",["Einstein","Ghandi","Me ?","Alexander Fleming"],"Alexander Fleming");

var q4 = new Question("How many people have walked on the moon ?",["7","24","3","12"],"12");

var q5 = new Question("What is the most spoken language in the world ?",["English","Spanish","Mandarin","Turkish"],"Mandarin");

var questions = [q1,q2,q3,q4,q5];


// Start Quiz

var quiz = new Quiz(questions);


loadQuestion();

function loadQuestion(){
    if(quiz.isFinish()){
        showScore();
    }
    else{
        var question = quiz.getQuestion();
        var choices = question.choices;

        for (let i = 0; i < choices.length; i++) {
           var element = document.querySelector('#choice'+i)
           element.innerHTML = choices[i]
           guess('btn'+i,choices[i])

        }
        showProgress()
        document.querySelector('#question').textContent = question.text
    }
}

function guess(id,guess){
     var btn = document.getElementById(id);
     btn.onclick = function(){
         quiz.guess(guess)
         loadQuestion()
     }
}

function showScore(){
    var html = `<h2>Score</h2><h4>${quiz.score}</h4>`
    document.querySelector('.card-body').innerHTML = html
    var element = document.getElementById("btnRestart");
    element.style.visibility= "visible"
}

function showProgress(){
    var totalQuestion = quiz.questions.length
    var questionNumber = quiz.questionIndex+1
    document.querySelector('#progress').innerHTML =  'Question ' + questionNumber +' of ' +totalQuestion
}

function restart(){
    location.reload();
}

function changeTheme(){
    document.body.classList.toggle('light')    
}
