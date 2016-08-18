var usedPokemon = [];

var Pokemon = function (id, cb) {
	cb = cb || function (){};
	var url = "http://pokeapi.co/api/v2/pokemon/" + id + "/";
	$.get(url, (function(res) {
		// Construct the Pokemon object
		var name = res["name"].slice(0,1).toUpperCase() + res["name"].slice(1);
		console.log("name = " + name);
		console.log(res);
		var imageUrl = res["sprites"].front_default;
		console.log(imageUrl);

		this.id = id;
		this.name = name;
		this.imageUrl = imageUrl;

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
			document.getElementById("opponent-pokemon-name").innerHTML = pokemon.name;
		} else {
			document.getElementById("your-pokemon-image").src = pokemon.imageUrl;
			document.getElementById("your-pokemon-name").innerHTML = pokemon.name;
		}
	});

}