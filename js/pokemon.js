var usedPokemon = [];
var opponentPokemon = "";
var yourPokemon = "";


randomInterval = function(min, max)
{
  return Math.floor(Math.random()*(max-min+1)+min);
}

var Move = function(name, url, cb2) {

cb2 = cb2 || function(){};

this.name = name;		  
$.get(url, (function(res) {

  if (!res) {
    res = {
      power: 0,
      class: 'physical',
      accuracy: 100
    };
  }

  
  this.power = res.power;
  this.class = res.type.name;
  this.accuracy = res.accuracy;

  cb2(this);
	}).bind(this));
};

function getMoves(data, cb){
    var moves=[];
    var temp;

    var newMove;


    var done = 0;
    for(var i=0; i<4; i++){
      temp =randomInterval(0, data.length-1);
      new Move(data[temp].move.name, data[temp].move.url, function(move){
      	moves.push(move);
      	done++;
      	if (done == 4){
      		cb(moves);
      	}
      });

      
    }
}

var Pokemon = function (id, cb, notPlayer) {
	cb = cb || function (){};
	var url = "http://pokeapi.kevgriffin.com/api/v2/pokemon/" + id + "/";
	$.get(url, (function(res) {
		console.log("res = " + res);

		// Construct the Pokemon object
		var name = res["name"].slice(0,1).toUpperCase() + res["name"].slice(1);
		var imageUrl = res["sprites"].front_default;

		// Get types
		var type1 = ((res["types"])[0].type)["name"];
		var type2 = null;
		if (res["types"].length > 1) {
			type2 = ((res["types"])[1].type)["name"];
		}

		// Get stats
		var stats = res.stats;
		for (var i = 0; i < stats.length; i++){
			var statName = (stats[i])["stat"].name;
			var value = (stats[i]).base_stat * 2 + 5;

			switch(statName) {
				case "defense":
					this.defense = value;
					break;
				case "attack":
					this.attack = value;
					break;
				case "special-defense":
					this.spdefense = value;
				case "special-attack":
					this.spattack = value;
				default:
					break;
			}
		} 

		this.id = id;
		this.name = name;
		this.imageUrl = imageUrl;
		this.type1 = type1;
		this.type2 = type2;

		var vm = this;
		console.log(this.type1 + ", " + this.type2);
		if(!notPlayer)
			getMoves(res.moves, function (newMoves){
				vm.moves= newMoves;
				cb(vm);
			});

	}).bind(this));
}

function init() {

	getRandomPokemon(true, function (p){
		opponentPokemon = p;
	});
	getRandomPokemon(false, function (p){
		yourPokemon = p;
		populateScreen();
	});
}

function computeDamage(){


}
function populateScreen(){
	var moves = yourPokemon.moves;
	for(var i=0; i<4;i++){
		document.getElementById("attack" + (i+1) + "-button").innerHTML = moves[i].name;
	}
}


function controller(){
	init();
	// populateScreen();
	computeDamage();
}


// Will want to pass in a list of numbers that the pokemon CANNOT be
function getRandomPokemon(isOpponent, cb){    
	var num = Math.floor((Math.random() * 150) + 1);
	while (usedPokemon.includes(num)) {
		num = Math.floor((Math.random() * 150) + 1);
	}

	usedPokemon.push(num);
 	var poke = new Pokemon(num, function (pokemon){

		if (isOpponent) {
			document.getElementById("opponent-pokemon-image").src = pokemon.imageUrl;
			document.getElementById("opponent-pokemon-name").innerHTML = pokemon.name;
			}
		else {
			document.getElementById("your-pokemon-image").src = pokemon.imageUrl;
			document.getElementById("your-pokemon-name").innerHTML = pokemon.name;
			/* for(var i=0; i<4;i++){
				document.getElementById("attack" + (i+1) + "-button").innerHTML = (pokemon.moves)[i].name;
			} */
		}
		cb(pokemon);
	}, isOpponent);

}
