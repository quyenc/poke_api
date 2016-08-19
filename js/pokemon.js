var usedPokemon = [];
var opponentPokemon = "";
var yourPokemon = "";

var poo = getRandomPokemon();

randomInterval = function(min, max)
{
  return Math.floor(Math.random()*(max-min+1)+min);
}

var Move = function(url, cb) {

cb = cb || function(){};
		  
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

  cb(this);
	}).bind(this));
};

function getMoves(data){
    var moves=[];
    var temp;


    
    while(moves.length<4)
    {
      temp =randomInterval(0, data.length-1);
      moves.push(new Move(data[temp].move.url));
    }
    
     
     return moves; 
    

}
var Pokemon = function (id, cb) {
	cb = cb || function (){};
	var url = "http://pokeapi.kevgriffin.com/api/v2/pokemon/" + id + "/";
	$.get(url, (function(res) {
		// Construct the Pokemon object
		var name = res["name"].slice(0,1).toUpperCase() + res["name"].slice(1);
		var imageUrl = res["sprites"].front_default;

		// Get stats
		var stats = res.stats;
		for (var i = 0; i < stats.length; i++){
			var statName = (stats[i])["stat"].name;
			var value = (stats[i]).base_stat;

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
		this.moves=getMoves(res.moves);

		cb(this);
	}).bind(this));
}

function init() {
	opponentPokemon = getRandomPokemon(true);
	yourPokemon = getRandomPokemon(false);
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
		} else {
			document.getElementById("your-pokemon-image").src = pokemon.imageUrl;
			document.getElementById("your-pokemon-name").innerHTML = pokemon.name;
		}
		return pokemon;
	});

}