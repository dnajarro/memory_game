//TODO: all the functionality for choosing/flipping a card

var game = {
  "is_two_player" : false,
  "player1" : 0,
  "player2" : 0,
  "cards_array" : 0, // array that holds all of the images
  "game_array" : 0, // array of all the cards as they are used in the game
  "turn_num" : 0
};

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
  };
  game["player1"] = player1;

  if (is_two_player) {
    var player2 = {
      "score" : 0,
      "myturn" : false
    };
    game["player2"] = player2;
    game["is_two_player"] = true;
  }

  var cards_array = initialize_cards_array();
  var game_array = initialize_game_array(cards_array);

  game["cards_array"] = cards_array;
  game["game_array"] = game_array;
  choose_first_turn(game);
  display_game_start();
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

//is the card assignment supposed to be in the do loop? 
//idex need sto be assigned outside of it to be in scope of for loop
function assign_cards(game_array, card_array) {
  for (var i = 0, len = card_array.length; i < len; i++) {
	var index = getRndInteger(0, len);
    do {
      index = getRndInteger(0, len);
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

/*
Here's random stuff for dealing with the card styling

//to make the card show the image
cards[x].style.backgroundImage = "url(" + imageArray[x] + ")";
//to make the card disappear
cards[x].style.visibility = "hidden";
//switching back could be kind of complicated
	//maybe we should use either colors OR images for both fronts and backs?


*/





function display_game_start() {
	//hide the welcome title and buttons
	var header = document.getElementById("start_header");
	header.style.visibility = "hidden";
	//display game info according to player # option
	change_display_info();
	//Make cards visible
	var game_board = document.getElementById("board");
	game_board.style.visibility = "visible";
}

function change_display_info() {
	var game_info = document.getElementById("game_info");
	//not sure if this is needed or if it replaces the HTML:
	game_info.innerHTML="";
	var info_content = "<h2>Player 1 score: " + game.player1.score + "</h2>";
	if (game.is_two_player) {
		info_content += ("<h2>Player 2 score: " + game.player2.score + "</h2>");
		info_content += ("<h2 id=\"whos_turn\" style=\"text-align: center\"><br>It's Player ";
		info_content += get_whose_turn();
		info_content += "(player_turn + " "turn!</h2>");
	}
	else {
		info_content += ("<h3>Turn " + game.turn_num + "</h3>");
	}
	game_info.innerHTML=info_content;
}

function get_whose_turn() {
	if (game.player1.myturn) {
		return "1";
	}
	else if (game.player2.myturn) {
		return "2";
	}
	else return "99";
}

function display_game_over() {
	div whole_thing = document.getElementById("main_container");
	whole_thing.innerHTML = ""; //again, not sure if that's necessary
	var display = "<div style=\"text-align: center\"><br><br><br><h1 style=\"color: red\">CONGRATULATIONS!</h1><h2>";
	if (game.is_two_player) {
		display += "Player ";
		display += get_winner():
		display += " won!</h2><h3>with " 
		display += get_top_score();
		display += " points</h3></div>"
	}
	else {
		display += "You won!</h2><h3>in " + game.turn_num + " turns</h3></div>";
	}
	whole_thing.innerHTML = display;
}

function get_winner() {
	if (game.player1.score > game.player2.score) {
		return "1";
	}
	else if (game.player1.score < game.player2.score) {
		return "2";
	}
	else if (game.player1.score == game.player2.score) {
		return "1 AND 2";
	}
}

function get_top_score() {
	var p1 = game.player1.score;
	var p2 = game.player2.score;
	if (p1 > p2) {
		return p1;
	}
	else if (p1 < p2) {
		return p2;
	}
	//else should be the same
	else if (p1 == p2) {
		return p1;
	}
	else {
		return 99999999;
	}
}
	