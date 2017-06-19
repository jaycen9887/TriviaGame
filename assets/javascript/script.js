var questions = {
    1: {
        question: "Inside which HTML element do we put the Javascript?",
        answers: ["<scripting>", "<script>", "<js>", "<javascript>"],
        correct: "<script>",
        topic: "assets/images/javascript.png"
    },
    
    2: {
        question: "What does HTML stand for?",
        answers: ["Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language", "How To Make Legos"],
        correct: "Hyper Text Markup Language",
        topic:  "assets/images/html.png",
    },
    
    3: {
        question: "What is the correct HTML for referring to an external style sheet?",
        answers: ["<link rel='stylesheet' type='text/css' href='mystyle.css'>", "<style src = 'mystyle.css'>", "<stylesheet>mystyle.css</stylesheet>", "<style href='mystyle.css'></style>"],
        correct: "<link rel='stylesheet' type='text/css' href='mystyle.css'>",
        topic: "assets/images/css.png",
    },
    
    4: {
        question: "The Bootstrap grid system is based on how many columns?",
        answers: ["9", "12", "15", "6"],
        correct: "12",
        topic:  "assets/images/bootstrap.png",
    },
    5: {
        question: "What is the correct jQuery code to set the background color of all p elements to red?",
        answers: ["$('p').style('background-color','red');", "$('p').layout('background-color','red');", "$('p').manipulate('background-color','red');", "$('p').css('background-color','red');"],
        correct: "$('p').css('background-color','red');",
        topic:  "assets/images/JQuery.png",
    }, 
    
    6: {
        question: "Correct JavaScript syntax to change the content of HTML below? </br> <p> id='demo'> This is a demostration.</p>",
        answers: ["document.getElement('p').innerHTML = 'Hello World!';", "#demo.innerHTML = 'Hello world!';", "document.getElementByName('p').innerHTML = 'Hello World!';", "document.getElementById('demo').innerHTML = 'Hello World!';"],
        correct: "document.getElementById('demo').innerHTML = 'Hello World!';",
        topic:  "assets/images/javascript.png",
    },
    
    7: {
        question: "What is the correct HTML for adding a background color?",
        answers: ["<body bg='yellow'>", "<background>yellow </background>", "<body style='background-color:yellow;'>","body.background-color === 'yellow'"],
        correct: "<body style='background-color:yellow;'>",
        topic:  "assets/images/html.png",
    },
    
    8: {
        question: "Where in an HTML document is the correct place to refer to an external style sheet?",
        answers: ["In the <body> section", "At the end of the document", "In the <head> section", "Either the <head> or the <body> tags are correct"],
        correct: "In the <head> section",
        topic:  "assets/images/css.png",
    },
    9: {
        question: "Which class is used to create a big box for calling extra attention?",
        answers: [".container", ".jumbotron", ".bigbox", ".alert"],
        correct: ".jumbotron",
        topic:  "assets/images/javascript.png",
    },
    
    10: {
        question: "Which sign does jQuery use as a shortcut for jQuery?",
        answers: ["the % sign", "the $ sign", "the ? sign", "the & sign"],
        correct: "the $ sign",
        topic:  "assets/images/JQuery.png",
    }
    

}

var questionCount = 0;
var qNum = 1;
var count;
var counter;
var barWidth;
var t;
var q;
var a;
var correct;
var correctCount = 0;
var incorrectCount = 0;
var unansweredCount = 0;
var percentage;
var color;

function timer() {
    count -= 1;
    if(count <= 0) {
        clearInterval(counter);
        unansweredCount++;
        //move to out of time screen
        $("#info").toggleClass("invisible");
        $("#flashCards").toggleClass("invisible");
        
        $("#infoTopic").html("<img src='" + t + "'>");
        $("#status").text("Correct");
        $("#answer").text(correct);
        $("#infoStatus").html("Correct: " + correctCount + "</br> Incorrect: " + incorrectCount + "</br> Unanswered: " + unansweredCount);
        $("#answer").css("color", "orange");
        setTimeout(nextQuestion, 5000);
        return;
    }
    
    
    if (count > 10){
        $("#timer").css("color", "black");
    }else if(count <= 10){
        $("#timer").css("color", "red");
        var audio = document.getElementById("timeRunningOut");
        audio.play();
    }
    
    //update time div
    $("#timer").text(count);
}

function progressBarUpdate() {
    barWidth = questionCount * 10;
    if (barWidth <= 100){
        $("#bar").css("width", barWidth + "%");
        $("#ratio").text(questionCount + "/10");
    }
    
    
}

function startQuestions(){
        questionCount++;
    if (questionCount <= 10){
        
        progressBarUpdate();
        q = questions[qNum].question;
        a = questions[qNum].answers;
        correct = questions[qNum].correct;
        t = questions[qNum].topic;

        $("#topic").html("<img src='" + t + "'>");
        $("#question").html(q);

        for (var i = 0; i < a.length; i++){   
            $("#answers ul").append("<li onmouseover='hoverBeep()' id='" + i + "'></li>");
            for (var j = 0; j < a.length; j++){
                $("#" + j).text(a[j]);
            }
        }
    }else {
        endQuiz();
    }
}

function correctAnswer() {
    //show correct answer screen
    clearInterval(counter);
    correctCount++;
    $("#info").toggleClass("invisible");
    $("#flashCards").toggleClass("invisible");
    $("#infoTopic").html("<img src='" + t + "'>");
    $("#status").text("Correct");
    $("#answer").text(correct);
    $("#infoStatus").html("Correct: " + correctCount + "</br> Incorrect: " + incorrectCount + "</br> Unanswered: " + unansweredCount);
    var audio = document.getElementById("correctAnswer");
    audio.play();
    $("#answer").css("color", "#6CD242");    
    setTimeout(nextQuestion, 5000);
           
}

function incorrectAnswer(){
    //show incorrect answer screen
    clearInterval(counter);
    incorrectCount++;
    $("#info").toggleClass("invisible");
    $("#flashCards").toggleClass("invisible");
    $("#infoTopic").html("<img src='" + t + "'>");
    $("#status").text("Correct");
    $("#answer").text(correct);
    $("#infoStatus").html("Correct: " + correctCount + "</br> Incorrect: " + incorrectCount + "</br> Unanswered: " + unansweredCount);
   var audio = document.getElementById("incorrectAnswer");
    audio.play();
    $("#answer").css("color", "red");
    setTimeout(nextQuestion, 5000);
    
}

function nextQuestion(){
    
         qNum++;

        $("#info").toggleClass("invisible");
        $("#flashCards").toggleClass("invisible");

        startQuiz();   
}
    
function startQuiz(){
    clearInterval(counter);
    count = 20;
    counter = setInterval(timer, 1000);
    startQuestions();
    
}

function calcPercentage(){
    percentage = correctCount / 10;
    
    percentage = percentage * 100;
    return percentage;
}

function endQuiz(){
    
    clearInterval(counter);
    //move to out of time screen
    $("#info").toggleClass("invisible");
    $("#flashCards").toggleClass("invisible");
    $("#infoTimer").html(" ");
    calcPercentage();
    if (percentage > 70){
        color = "#6CD242";
        var audio = document.getElementById("clapping");
        audio.play();
    }else if (percentage < 70){
        color = "red";
        var audio = document.getElementById("fail");
        audio.play();
    }
    $("#infoImage").html("You scored " + percentage + "%");

    $("#correct").html("<h1>FINISHED</h1>");
    $("#infoStatus").html("Correct: " + correctCount + "</br> Incorrect: " + incorrectCount + "</br> Unanswered: " + unansweredCount);
    $("#infoImage").css({"margin-top": "150px", "font-size": "60px", "color": color});
}

function hoverBeep() {
    var audio = document.getElementById("beep");
    audio.play();
}

function clockTicking(){
    var audio = document.getElementById("clockTicks");
    audio.play();
}

function reset(){
    clearInterval(counter);
    questionCount = 0;
    qNum = 1;
    barWidth = 10;

    correctCount = 0;
    incorrectCount = 0;
    unansweredCount = 0;
    percentage = 0;
    
    if ($("#flashCards").classList.contains("invisible")){
        $("#info").toggleClass("invisible");
        $("#flashCards").toggleClass("invisible");
    }

    
    startQuiz();

}

$(document).ready(function(){
   
    startQuiz();
    
      $("li").on("click", function() {
     
      var getInfo = $(this);
      var getTag = getInfo[0];
      var getId = getTag.id;
      var selectedAnswer = $("#" + getId).text();
      
      if (selectedAnswer === correct){
          correctAnswer();
          
      }else if (selectedAnswer !== correct){
          incorrectAnswer();
      }
  
  });
    
});