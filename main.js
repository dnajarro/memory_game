//TODO: all the functionality for choosing/flipping a card

var game = {
  "is_two_player" : false,
  "player1" : 0,
  "player2" : 0,
  "cards_array" : 0, // array that holds all of the images
  "game_array" : 0, // array of all the cards as they are used in the game
  "turn_num" : 0,
  "is_player_one_turn" : true,
  "legal" : true
};

function initialize_game(is_two_player) {
  var player1 = {
    "score" : 0
  };
  game["player1"] = player1;
  if (is_two_player) {
    var player2 = {
      "score" : 0
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
    game["is_player_one_turn"] = true;
  }
  else {
    game["is_player_one_turn"] = false;
  }
}

// TODO: get images and fill array with them
function initialize_cards_array() {
  var cards_array = new Array(16).fill(0);  // contains the images that we have in the
                        // webpage's folder
    cards_array[0] = "desert.jpg";
    cards_array[1] = cards_array[0];
    cards_array[2] = "fire.jpg";
    cards_array[3] = cards_array[2];
    cards_array[4] = "flower.jpg";
    cards_array[5] = cards_array[4];
    cards_array[6] = "mountain.jpg";
    cards_array[7] = cards_array[6];
    cards_array[8] = "snow.jpg";
    cards_array[9] = cards_array[8];
    cards_array[10] = "stars.jpg";
    cards_array[11] = cards_array[10];
    cards_array[12] = "tree.jpg";
    cards_array[13] = cards_array[12];
    cards_array[14] = "waterfall.jpg";
    cards_array[15] = cards_array[14];
    game["cards_array"] = cards_array;
}

function initialize_game_array() {
   var game_array = new Array(16).fill(0);
    var len = game["cards_array"].length;
    var i = 0;
  for (i = 0; i < len; i++) {
	var index = getRndInteger(0, len);
    do {
      index = getRndInteger(0, len);
    } while (game_array[index] != 0);
    var card = {
      "exists" : true,
      "faceup" : false,
      "image" : game["cards_array"][i]
    };
	game_array[index] = card;

  }
  return game_array;
}

function find_flipped_card() {
    
  for (var i = 0; i < game["game_array"].length; i++) {
    if (game["game_array"][i]["faceup"] == true) {
      return i;
    }
  }
  return -1;
}

function is_end_game() {
    
  for (var i = 0; i < game["game_array"].length; i++) {
    if (game["game_array"][i]["exists"] == true) {
      return false;
    }
  }
  return true;
}

function handle_second_card(index, current_card, flipped_index) {
    var match_card = document.getElementById(flipped_index.toString());
                if (game["game_array"][index]["image"] ==   // if the image matches
                    game["game_array"][flipped_index]["image"]) {
                    current_card.style.visibility = "hidden";
                    match_card.style.visibility = "hidden";
                    game["game_array"][index]["exists"] = false;
                    game["game_array"][flipped_index]["exists"] = false;
                    game["game_array"][index]["faceup"] = false;
                    game["game_array"][flipped_index]["faceup"] = false;
                    if (game["is_player_one_turn"] == true) {
                        game.player1.score++;
                    }
                    else {
                        game.player2.score++;
                    }
                    if (is_end_game()) {
                        display_game_over();
                    }
                    game.turn_num++;
                }
                else {  // if image doesn't match
                    current_card.style.backgroundImage = "url(back.jpg)";
                    match_card.style.backgroundImage = "url(back.jpg)";
                    game["game_array"][index]["faceup"] = false;
                    game["game_array"][flipped_index]["faceup"] = false;
                    game.turn_num++;
                    if (game.is_two_player) {
                        if (game.is_player_one_turn) {
                            game.is_player_one_turn = false;
                        }
                        else {
                            game.is_player_one_turn = true;
                        }
                    }
                }
                change_display_info();
                game["legal"] = true;
}


function check_card(index) {
    if (game["legal"]) {
          if (game["game_array"][index]["exists"] == true
        && game["game_array"][index]["faceup"] == false) {
            var flipped_index = find_flipped_card();
            var current_card = document.getElementById(index.toString());
            current_card.style.backgroundImage = "url("
                                    + game["game_array"][index]["image"] + ")";
            game["game_array"][index]["faceup"] = true;
            if (flipped_index != -1) {
                game["legal"] = false;
                setTimeout(handle_second_card, 1000, index, current_card, flipped_index);
            }
        }
    }
}

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
		info_content += ("<h2 id=\"whos_turn\" style=\"text-align: center\"><br>It's Player ");
		info_content += get_whose_turn();
		info_content += ("'s turn!</h2>");
	}
	else {
		info_content += ("<h3>Turn " + game.turn_num + "</h3>");
	}
	game_info.innerHTML=info_content;
}

function get_whose_turn() {
	if (game.is_player_one_turn) {
		return "1";
	}
	else {
	    return "2";
	}
}

function display_game_over() {
	var whole_thing = document.getElementById("main_container");
	whole_thing.innerHTML = ""; //again, not sure if that's necessary
	var display = "<div style=\"text-align: center\"><br><br><br><h1 style=\"color: red\">CONGRATULATIONS!</h1><h2>";
	if (game.is_two_player) {
		display += "Player ";
		display += get_winner();
		display += " won!</h2><h3>with " ;
		display += get_top_score();
		display += " points</h3></div>";
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
	
