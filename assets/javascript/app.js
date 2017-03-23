// Question set
  var questions = [
  {

    question:"Which one of these men was responsible for animating the original Mickey Mouse?",
    answers: ["Ub Iwerks", "Frank Thomas", "Walt Disney", "John Lasseter"],
    correct_index: 0

  },


  {
    question:"Ub Iwerks, early's Disney's most efficient animators, could alone draw about how many frames a day?",
    answers: ["50", "200", "100", "80"],
    correct_index: 3

  },

  {
    question:"What was the first Disney movie to feature 3D animation?",
    answers: ["The Rescuers Down Under", "The Great Mouse Detective", "Toy Story", "101 Dalmations"],
    correct_index: 1
  },

  {
    question:"Which Disney short became famous for being the first to feature synchonized sound?",
    answers: ["Steamboat Willie", "Plane Crazy", "Oh What a Knight!", "The Old Mill"],
    correct_index: 0
  },

  {
    question:"Which of the Disney rides was designed in it's entirety by it's only leading female artist?",
    answers: ["The Teacup Ride", "The Haunted Mansion", "Pirates of the Carribbean", "It's a Small World"],
    correct_index: 3
  }

  ];

// Variable that will hold the setInterval
var timer;

var correct = 0;
var incorrect = 0;
var timeLeft = 120;
 var missed = (questions.length - (incorrect + correct));

// purpose of this function:
//   called once for each passing second of time to display, and track
//   a countdown for the user.
  function countdown() {
  // todo: decrement the counter variable

      timer = setInterval(timeLeft, 1000);

  }

  function timeleft () {

  // todo: set the counter-number element in the dom to be the counter number

      timeLeft--;

  // todo: when counter is 0, call done().

      if(timeLeft === 0){

      //then stop the timer

        done();

    }
  }

// purpose of this function:
//   called to begin the game (which begins when they click the 'start' button)
  function start() {

      // todo: start the timer (setInterval) using the countdown function as a callback

      countdown();

       // todo: prepend html to the sub-wrapper element in the dom to show an initial countdown time

      $("#sub-wrapper").prepend("<h2>" + timeLeft + "</h2>");

       // todo: remove the #start button element from the dom (since the game is now starting)

       $("#start").remove();

       // loop thru the questions array
      for (var i = 0; i < questions.length; i++) {

        // todo: append html to the dom's #quiz-area that displays the question

         $("#quiz-area").append(questions.length);
         console.log(questions[i]);

      // // loop thru the answers in the question

       for (var j = 0; j < questions[i].answers.length; j++) {

      // append html to the dom's #quiz-area that displays the answers

       $("#quiz-area").append("<input type='radio' name='question-" + i +
       "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);

       console.log(questions[i].answers.length);

       }
      }

      // todo: append html to the dom's #quiz-area that displays a done button with an id='done'

      $("#quiz-area").append("<input type = 'button' name= 'done' ");
  }


// purpose of this function:
//   called to end the game (which ends when they click the 'done' button)
function done() {

  // tally the correct and incorrect answers for the first question
  $.each($("input[name='question-0']:checked"), function() {
    if ($(this).val() === questions[0].correct_index) {
      correct++;
    }
    else {
      incorrect++;
    }
  });

  // todo: tally the correct and incorrect answers for the remaining questions

   $.each($("input[name='question-1']:checked"), function() {
    if ($(this).val() === questions[3].correct_index) {
      correct++;
    }
    else {
      incorrect++;
    }
  });


  $.each($("input[name='question-1']:checked"), function() {
    if ($(this).val() === questions[1].correct_index) {
      correct++;
    }
    else {
      incorrect++;
    }
  });


  $.each($("input[name='question-1']:checked"), function() {
    if ($(this).val() === questions[0].correct_index) {
      correct++;
    }
    else {
      incorrect++;
    }
  });

$.each($("input[name='question-1']:checked"), function() {
    if ($(this).val() === questions[3].correct_index) {
      correct++;
    }
    else {
      incorrect++;
    }
  });

  // todo: call function to display the user's quiz results

  result();

}

// purpose of this function:
//   displays the user's quiz results
function result() {

  // todo: stop the timer using clearInterval

    timer(clearInterval);

  // todo: remove the dom element targeted by $("#sub-wrapper h2")
  //       (this is what we created in the start() function above)

  ("<h2>" + timeLeft + "</h2").remove();

  // todo: replace the contents of the dom element #quiz-area with the results
  //       of the quiz.
  //       hint: the results are held in the variables: 'correct', 'incorrect', and
  //             the unanswered questions can be derived by:
  //             (questions.length - (incorrect + correct))

  $("#quiz-area").prepend("You got " + correct + " correct");

  $("#quiz-area").append("You got " + incorrect + "incorrect");

  $("#quiz-area"). append("You missed" + missed + " many questions");
}

// CLICK EVENTS

$(document).on("click", "#start", function() {

  // todo: call function to start the game

  start();

});


$(document).on("click", "#done", function() {

  // todo: call function to end the game

  done();

});