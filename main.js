
var game = {
  "is_two_player" : false,
  "player1" : 0,
  "player2" : 0,
  "cards_array" : 0, // array that holds all of the images
  "game_array" : 0, // array of all the cards as they are used in the game
  "turn_num" : 1,
  "is_player_one_turn" : true,
  "legal" : true //whether doing stuff in the moment is "legal," allowed
};

//initializes game for 1 or 2 players
function initialize_game(is_two_player) {
  //initialize players
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
  
  //initialize cards
  var cards_array = initialize_cards_array();
  var game_array = initialize_game_array(cards_array);
  game["cards_array"] = cards_array;
  game["game_array"] = game_array;
  
  choose_first_turn(game);
  display_game_start();
}

// gives a random number within min (inclusive) and max (exclusive)
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

//randomly assigns first turn in 2-player mode
function choose_first_turn() {
  if (getRndInteger(0,2) == 0) {
    game["is_player_one_turn"] = true;
  }
  else {
    game["is_player_one_turn"] = false;
  }
}


function initialize_cards_array() {
  //make empty 16 array
  // will contain the images in root folder
  var cards_array = new Array(16).fill(0);  
    
    //assign 2 of each image in the array (pairs)
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

//make the cards used in the game and put them in place
function initialize_game_array() {
   var game_array = new Array(16).fill(0);
   
    var len = game["cards_array"].length;
    var i = 0;
    
  //for each of the 16 spots on the board
  for (i = 0; i < len; i++) {
	var index = getRndInteger(0, len);
	
	//get a random index of the game_array that is uninitialized (0)
    do {
      index = getRndInteger(0, len);
    } while (game_array[index] != 0);
    
    //make a card
    var card = {
      "exists" : true,
      "faceup" : false,
      "image" : game["cards_array"][i]
    };
    //put it in the game_array (board)
	game_array[index] = card;

  }
  return game_array;
}

//find index of card that is face-up, returns -1 if none
function find_flipped_card() {
  for (var i = 0; i < game["game_array"].length; i++) {
    if (game["game_array"][i]["faceup"] == true) {
      return i;
    }
  }
  return -1;
}

//searches to see if no more cards "exist" on the board
function is_end_game() {
  for (var i = 0; i < game["game_array"].length; i++) {
    if (game["game_array"][i]["exists"] == true) {
      return false;
    }
  }
  return true;
}

//function called to flip over a card
function check_card(index) {
    //checks if we're allowed to do anything, or are waiting
    if (game["legal"]) { 
        //if card exists and is not already faceup
         if (game["game_array"][index]["exists"] == true
                    && game["game_array"][index]["faceup"] == false) {
            var flipped_index = find_flipped_card();
            var current_card = document.getElementById(index.toString());
            //put in the image
            current_card.style.backgroundImage = "url("
                                    + game["game_array"][index]["image"] + ")";
            game["game_array"][index]["faceup"] = true;
            if (flipped_index != -1) {
                //if there's another card already flipped over
                //the rest of this function needs a time delay so can see the
                    //second card before it disappears or flips back over
                //during which we are NOT ALLOWED to do anything else!!
                game["legal"] = false;
                setTimeout(handle_second_card, 1000, index, current_card, flipped_index); //delay of 1s
            }
        }
    }
}

//function to deal with second card flipped over
function handle_second_card(index, current_card, flipped_index) {
    var match_card = document.getElementById(flipped_index.toString());
                // if the image matches
                if (game["game_array"][index]["image"] ==   
                                game["game_array"][flipped_index]["image"]) {
                    //cards disappear and don't "exist"
                    current_card.style.visibility = "hidden";
                    match_card.style.visibility = "hidden";
                    game["game_array"][index]["exists"] = false;
                    game["game_array"][flipped_index]["exists"] = false;
                    game["game_array"][index]["faceup"] = false;
                    game["game_array"][flipped_index]["faceup"] = false;
                    //increase the score and/or turn
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
                    //flip the cards back over
                    current_card.style.backgroundImage = "url(back.jpg)";
                    match_card.style.backgroundImage = "url(back.jpg)";
                    game["game_array"][index]["faceup"] = false;
                    game["game_array"][flipped_index]["faceup"] = false;
                    //add turn and switch turns if applicable
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
                //update display according to changes made
                change_display_info();
                game["legal"] = true; //now that that's finished we're allowed to do things again!
}

//displays the start of the game
function display_game_start() {
	//hide the welcome title and buttons
	var header = document.getElementById("start_header");
	header.style.display = "none";
	//display game info according to player # option
	change_display_info();
	//Make cards visible
	var game_board = document.getElementById("board");
	game_board.style.visibility = "visible";
}

//update the display information
function change_display_info() {
	var game_info = document.getElementById("game_info");
	game_info.innerHTML="";
	var info_content = "";
	if (game.is_two_player) {
		info_content += ("<h2>Player 1 score: " + game.player1.score 
		    + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" 
		    + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" 
		    + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" 
		    + "Player 2 score: " + game.player2.score + "</h2>");
		info_content += ("<h1>It's Player ");
		info_content += get_whose_turn();
		info_content += ("'s turn!</h1>");
	}
	else {
		info_content += ("<h2>Turn " + game.turn_num + "</h2>");
	}
	game_info.innerHTML=info_content;
}

//returns string of whose turn it is
function get_whose_turn() {
	if (game.is_player_one_turn) {
		return "1";
	}
	else {
	    return "2";
	}
}

//change display for game over
function display_game_over() {
	var whole_thing = document.getElementById("main_container");
	whole_thing.innerHTML = ""; 
	var display = "<div style=\"text-align: center\">";
	display += "<br><br><img src=\"https://media.giphy.com/media/FyuTewQJGQIc8/giphy.gif\" style=\"width:50%\"><h1><br>";
	
	if (game.is_two_player) {
		display += "Player ";
		display += get_winner();
		display += " won!</h1><h2>with " ;
		display += get_top_score();
		display += " points</h2>";
	}
	else {
		display += "You won!</h1><h2>in " + game.turn_num + " turns</h2>";
	}
	display += "<br><br><br><br><br><a href=\"http://cs260.efisar.org/creative_project1/\">PLAY AGAIN</a></div>"
	whole_thing.innerHTML = display;
}

//get the winner
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

//get the top score
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
	
