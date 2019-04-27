window.onload = function () {
/*//words
    var words = [
        "cake",
        "cookie",
        "pie",
        "tart",
        "pudding",
        "cholocate",
        "cobbler",
        "cupcake",
        "tiramisu",
        "donut"
    ];

    var word = words[Math.floor(math.random()*words.length)];

    var blankSpace = [];
    for (var i = 0; i < word.length; i++){
        blankSpace[i]= "_";
    }

    var remainingLetters = word.length;

    while (remainingLetters > 0) {
        var el = document.getElementById();
        el.innerHTML = blankSpace.join(" ");

    }

}*/
var words = [
    "cake",
    "cookie",
    "pie",
    "tart",
    "pudding",
    "cholocate",
    "cobbler",
    "cupcake",
    "tiramisu",
    "donut"
];
/*var game = {
    guessed: [],
    left: 10,
    start: function() {
      this.complete = false;
      this.word = words[Math.floor(Math.random() * words.length)];
      this.$right = document.getElementById('right');
      this.$wrong = document.getElementById('wrong');
      this.$remain = document.getElementById('remain');
      this.$right.innerHTML = '_'.repeat(this.word.length);
    },
    guess: function(letter) {
      if (this.left > 0 && this.complete != true) {
        if (this.word.indexOf(letter) > -1 || this.guessed.indexOf(letter) > -1) {
          this.right(letter);
        } else {
          this.wrong(letter);
        }
      }
    },
    right: function(letter) {
      for(var i = 0; i < this.word.length; i++) {
        if (this.word[i] == letter) {
          var word = this.$right.innerHTML.split('');
          word[i] = letter;
          this.$right.innerHTML = word.join('');
        }
      }
      if (this.$right.innerHTML.indexOf('_') < 0) {
        alert('you win!');
        this.complete = true;
      }
    },
    wrong: function(letter) {
      this.guessed.push(letter);
      this.$wrong.innerHTML += ' ' + letter;
      this.left--;
      this.$remain.innerHTML = this.left;
      if (this.left < 1) {
        alert('you lose! '+ this.word);
        this.complete = true;
      }
    }
  };
  game.start();
  document.onkeyup = function(event) {
    var letter = String.fromCharCode(event.keyCode).toLowerCase();
    game.guess(letter);
  };
}*/
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lives = 10;
var winCounter = 0;
var loseCounter = 0;
var messages = {
    win: 'You win!',
    lose: 'You lose. Game over.',
    guessed: 'You guessed that letter already! Try again.',
    validLetter: 'Enter a letter from A - Z',
}
var isLetter = false;
var alreadyGuessed = false;
var lettersGuessed = [];
var guesses = 0;
var currentWord;
var hiddenWord = [];
var rightLetter = false;
var winnerWinner = true;
var wordInt;


function newGame() {
    word = Math.floor((Math.random() * words.length));
    currentWord = words[word];
    console.log(currentWord);

    if (hiddenWord.length !== currentWord.length) {
        hiddenWord = [];
    }

    //replace characters with blanks
    for (var i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === " ") {
            hiddenWord[i] = "  ";
        } else {
            hiddenWord[i] = (" _ ");
        }
    }

    $('#hiddenWord').html(hiddenWord);
}

//Records keyboard input
document.onkeyup = function(event) {
    var userGuess = String.fromCharCode(event.keyCode).toUpperCase();
    var enter = (event.keyCode);

    if (enter == 13) {
        newGame();
    }

    //Check to see if letter, if not send message: validLetter
    for (var i = 0; i < alphabet.length; i++) {
        if (userGuess === alphabet.charAt(i)) {
            isLetter = true;
        }
    }

    if (isLetter == false && enter != 13) {
        $('#messages').html(messages.validLetter);
    }

    //If letter was guessed already send message: guessed
    for (var i = 0; i < lettersGuessed.length; i++) {
        if (userGuess === lettersGuessed[i]) {
            alreadyGuessed = true;
        }
    }

    //If already in the clue, then returns alert saying guessed already
    for (var i = 0; i < hiddenWord.length; i++) {
        if (userGuess == hiddenWord[i]) {
            alreadyGuessed = true;
        }
    }

    if (alreadyGuessed == true) {
        $('#messages').html(messages.guessed);
    }

    //Checks for letter match and inserts into hiddenWord array
    for (var i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === userGuess) {
            hiddenWord[i] = currentWord[i];
            rightLetter = true;
        }
    }

    //Pushes letters guess into an array and takes away a life for wrong letter. 
    if (isLetter == true && alreadyGuessed == false && rightLetter == false) {
        lettersGuessed.push(userGuess);
        lives--;
        $('#lives').html(lives);
    }

    $('#lettersGuessed').html(lettersGuessed);
    $('#hiddenWord').html(hiddenWord);

    //When out of lives - user loses and counter goes up
    if (lettersGuessed.length == 12) {
        $('#messages').html(messages.lose);
        lettersGuessed = [];
        $('#lettersGuessed').html(lettersGuessed);
        loseCounter++;
        $('#loseCounter').html(loseCounter);
        lives = 12;
        newGame();
    }

    //Resets booleans between keystrokes.
    rightLetter = false;
    isLetter = false;
    alreadyGuessed = false;

    //Asks if the user has won
    if (enter != 13) {
        win();
    }
}

function win() {

    for (var i = 0; i < currentWord.length; i++) {
        if (hiddenWord[i] == " _ ") {
            winnerWinner = false;
        }
    }

    if (winnerWinner == true) {
        $('#messages').html(messages.win);

        //plays music after you win to the corresponding word *WORKING
        for (var i = 0; i < playlist.length; i++) {
            if (wordInt === i) {
                audio.src = dir + playlist[i] + ext;
                audio.play();
            }
        }

        winCounter++;
        $('#winCounter').html(winCounter);
        lettersGuessed = [];
        $('#lettersGuessed').html(lettersGuessed);
        lives = 12;
        $('#lives').html(lives);

        newGame();
    }

    winnerWinner = true;
}
}