
var panel = $("#quiz-area");
var countStartNumber = 30;

// Question set
var questions = [{
  question: "The Boston Terrier was the first ever breed to be accepted into the AKC. What year was it accepted?",
  answers: ["1890", "1901", "1893", "1777"],
  correctAnswer: "1893",
  image: "assets/images/q4.gif"
}, {
  question: "This Disney short released in 2013 featured a Boston Terrier",
  answers: ["Feast", "What a Horse", "Piper", "Inner Workings"],
  correctAnswer: "Feast",
  image: "assets/images/q3.gif"
}, {
  question: "Boston Terriers are usually considered to have what energy level?",
  answers: ["High", "Medium", "Low", "Lazy"],
  correctAnswer: "Medium",
  image: "assets/images/q2.gif"
}, {
  question: "Boston Terriers usually need this many minutes of exercise a day",
  answers: ["15", "30", "45", "10"],
  correctAnswer: "30",
  image: "assets/images/q5.gif"
}, {
  question: "Why are Boston Terriers called the American Gentlemen?",
  answers: ["They originated in Boston, Mass", "They were originally owned mostly by the wealthy", "Their unique looking gentlemen-suit like coat", "A and C"],
  correctAnswer: "A and C",
  image: "assets/images/finale.gif"
}, {
  question: "Boston terriers were originally bred to be fighting dogs but due to their smaller stature, speed, energy level, keen sense of smell and affectionate and docileness, they eventually were bred to be housepets and _________ ",
  answers: ["Show Dogs", "Rat Catchers", "Firefighting Dogs", "Police Dogs"],
  correctAnswer: "Rat Catchers",
  image: "assets/images/q7.gif"
}, {
  question: "Boston Terriers, like pugs and bulldogs, have short noses which make them what kind of dog?",
  answers: ["Bronchiatic", "Brachycephalic", "Loud", "Friendly"],
  correctAnswer: "Brachycephalic",
  image: "assets/images/q6.gif"
}];

// Variable to hold our setInterval
var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    this.counter--;
    $("#counter-number").html(this.counter);
    if (this.counter === 0) {
      console.log("TIME UP");
      this.timeUp();
    }
  },

  loadQuestion: function() {
    //setting the timer interval and binding this countdown number
    timer = setInterval(this.countdown.bind(this), 1000);
    //appending the question to the panel title
    panel.html("<h3>" + questions[this.currentQuestion].question + "</h3> <br/><br/>");
    //looping through the questions and appending the answer button and the questions and answers to the panel
    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    //starting the counter
    this.counter = window.countStartNumber;
    $("#counter-number").html(this.counter);
    //advancing to the next question
    this.currentQuestion++;
    //binding the next loaded question to the panel
    this.loadQuestion.bind(this)();
  },

  timeUp: function() {
    //clearing the timer at the time up
    clearInterval(window.timer);
    //appending the oounter to the html
    $("#counter-number").html(this.counter);
    //the header message
    panel.html("<h2>Out of Time!</h2>");
    //appending the correct answer
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    //appending the question image
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results, 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion, 3 * 1000);
    }
  },

  results: function() {
    //clearing the timer
    clearInterval(window.timer);
    //appending the header title
    panel.html("<h2>All done, heres how you did!</h2>");
    //appending the counter
    $("#counter-number").html(this.counter);
    //showing correcting answers
    panel.append("<h3>Correct Answers: " + this.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
    panel.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(window.timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {
    //increment incorrect questions
    this.incorrect++;
    //clear the time
    clearInterval(window.timer);
    //appending incorrect data
    panel.html("<h2>Darn!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer + "</h3>");
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  answeredCorrectly: function() {
    //cleaing the interval
    clearInterval(window.timer);
    //showing amount correct
    this.correct++;
    //appending correct data
    panel.html("<h2>Nice Job!</h2>");
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", game.reset.bind(game));

$(document).on("click", ".answer-button", function(e) {
  game.clicked.bind(game, e)();
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion.bind(game)();
});
