//TODO: all the functionality for choosing/flipping a card

var game = {
  "is_two_player" : false;
  "player1" : 0,
  "player2" : 0,
  "cards_array" : 0, // array that holds all of the images
  "game_array" : 0, // array of all the cards as they are used in the game
  "turn_num" : 0
}

function game_over(is_two_player, winner, winning_value) {
  if (is_two_player) {
    alert("The winner is " + winner "!\n" +
          winner + " won with " + winning_value + " points!");
  }
  else {
    alert("You win!\n" + "Number of turns: " + winning_value);
  }
}

function initialize_game(is_two_player) {
  var player1 = {
    "score" : 0,
    "myturn" : false
  }
  game["player1"] = player1;

  if (is_two_player) {
    var player2 = {
      "score" : 0,
      "myturn" : false
    }
    game["player2"] = player2;
    game["is_two_player"] = true;
  }

  var cards_array = initialize_cards_array();
  var game_array = initialize_game_array(cards_array);

  game["cards_array"] = cards_array;
  game["game_array"] = game_array;
  choose_first_turn(game);
  return game;
}

// gives a random number within min (inclusive) and max (exclusive)
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function choose_first_turn() {
  if (getRndInteger(0,2) == 0) {
    game["player1"]["myturn"] = true;
  }
  else {
    game["player2"]["myturn"] = true;
  }
}

// TODO: get images and fill array with them
function initialize_cards_array() {
  var cards_array = new Array(16).fill(0);  // contains the images that we have in the
                        // webpage's folder
  // fill the array
}

function initialize_game_array(cards_array) {
  var game_array = new Array(16).fill(0); // 8 unique cards, 2 of each
  game_array = assign_cards(game_array, cards_array);
  return game_array;
}

function assign_cards(game_array, card_array) {
  for (var i = 0, len = card_array.length; i < len; i++) {
    do {
      var index = getRndInteger(0, len);
    } while (game_array[index] != 0);

    var card = {
      "exists" : true,
      "faceup" : false,
      "image" : card_array[i]};
    }
    game_array[index] = card;
  }
  return game_array;
}

function find_flipped_card() {
  for (var i = 0; i < game["game_array"].length; i++) {
    if (game["game_array"][i]["faceup"] == true) {
      return true;
    }
  }
  return false;
}

function check_card(index) {
  if (game["game_array"][index]["exists"] == true) {
    if (find_flipped_card == true) {
      // check matching
    }
    else {
      // wait for next card to be clicked
    }
  }
}
