//TODO: all the functionality for choosing/flipping a card

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
  var game = {
    "player1" : 0,
    "player2" : 0,
    "cards_array" : 0,
    "game_array" : 0,
    "turn_num" : 0
  }

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

function choose_first_turn(game) {
  if (getRndInteger(0,2) == 0) {
    game["player1"]["myturn"] = true;
  }
  else {
    game["player2"]["myturn"] = true;
  }
}

// TODO: get images and fill array with them
function initialize_cards_array() {
  var cards_array = []  // contains the images that we have in the
                        // webpage's folder
}

function initialize_game_array(cards_array) {
  var gmae_array = new Array(16).fill(0); // 8 unique cards, 2 or each
  game_array = assign_cards(game_array, cards_array);
  return game_array;
}

function assign_cards(game_array, cards_array) {
  for (var i = 0, len = game_array.length; i < len; i++) {
    do {
      var index = getRndInteger(0, len);
    } while (game_array[index] != 0);

    var card = {
      "exists" : true,
      "faceup" : false,
      "image" : cards_array[i]};
    }
    cards_array[index] = card;
  }
  return game_array;
}
