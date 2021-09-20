$(document).ready(function(){
  var currentQuestion;
  var interval;
  var timeLeft = 10;
  var score = 0;
  var maxScore = 0;
  var operation = "a";
  var level = 10;
  
  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  };
  
  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
  };

  var updateMaxScore = function (amount) {
    var scoreCheck = score - maxScore;
    if (scoreCheck>0) {
      maxScore = score;
    }
    $('#maxScore').text(maxScore);
  };
  
  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateMaxScore();
        updateScore(-score);
      }
      // if (timeLeft <6) {
      //   $('#timer h3').removeClass('.timer h3').addClass('.timer2 h3');
      // }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);  
    }
  };
  
  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  };
  
  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(level);
    var num2 = randomNumberGenerator(level);

    switch (operation) {
      case "a":
        question.answer = num1 + num2;
        question.equation = String(num1) + " + " + String(num2);
      return question;

      case "b":
        question.answer = num1 - num2;
        question.equation = String(num1) + " - " + String(num2);
      return question;

      case "c":
        question.answer = num1 * num2;
        question.equation = String(num1) + " * " + String(num2);
      return question;

      case "d":
        question.answer = num1 / num2;
        question.equation = String(num1) + " / " + String(num2);
      return question;
    }   
    
  };
  
  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    if (currentQuestion.answer < 0){
    renderNewQuestion()}
    if (currentQuestion.answer % 1 !== 0){ 
    renderNewQuestion()}
    $('#equation').text(currentQuestion.equation);  
  };
  
  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };
  
  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  $('#suma').on('click', function () {
    operation = "a";
    renderNewQuestion();
  });

  $('#resta').on('click', function () {
    operation = "b";
    renderNewQuestion();
  });

  $('#multiplicacion').on('click', function () {
    operation = "c";
    renderNewQuestion();
  });

  $('#division').on('click', function () {
    operation = "d";
    renderNewQuestion();
  });

  var elInput = document.querySelector('#inputLevel');
    if (elInput) {
  var etiqueta = document.querySelector('#etiqueta');
    if (etiqueta) {
      etiqueta.innerHTML = elInput.value;

      elInput.addEventListener('input', function() {
        etiqueta.innerHTML = elInput.value;
      }, false);
    }
  }

  $(document).on('change', '#inputLevel', function() {
    level = this.value;
  });

  renderNewQuestion();

});