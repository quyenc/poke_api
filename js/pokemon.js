var usedPokemon = [];

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
	var url = "http://pokeapi.co/api/v2/pokemon/" + id + "/";
	$.get(url, (function(res) {
		// Construct the Pokemon object
		var name = res["name"];
		console.log("name = " + name);
		console.log(res);
		var imageUrl = res["sprites"].front_default;
		console.log(imageUrl);

		this.id = id;
		this.name = name;
		this.imageUrl = imageUrl;
		this.moves=getMoves(res.moves);

		cb(this);
	}).bind(this));
}

// Will want to pass in a list of numbers that the pokemon CANNOT be
function getRandomPokemon(isOpponent, cb){    
	var num = Math.floor((Math.random() * 150) + 1);
	while (usedPokemon.includes(num)) {
		num = Math.floor((Math.random() * 150) + 1);
	}

	usedPokemon.push(num);
 	var poke = new Pokemon(num, function (pokemon){
		console.log("from constructor: " + pokemon.imageUrl);

		if (isOpponent) {
			document.getElementById("opponent-pokemon-image").src = pokemon.imageUrl;
		} else {
			document.getElementById("your-pokemon-image").src = pokemon.imageUrl;
		}

		//cb(pokemon);
	});
	alert(); 

}