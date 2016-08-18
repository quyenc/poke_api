var usedPokemon = [];

var Pokemon = function (id) {
	var url = "http://pokeapi.co/api/v2/pokemon/" + id + "/";
	$.get(url, function(res) {
		// Construct the Pokemon object
		var name = res["name"];
		console.log("name = " + name);
		console.log(res);
		var imageUrl = res["sprites"].front_default;
		console.log(imageUrl);

		this.id = id;
		this.name = name;
		this.imageUrl = imageUrl;

		return this;
	});
}

// Will want to pass in a list of numbers that the pokemon CANNOT be
function getRandomPokemon(isOpponent){    
	var num = Math.floor((Math.random() * 150) + 1);
	while (usedPokemon.includes(num)) {
		num = Math.floor((Math.random() * 150) + 1);
	}

	usedPokemon.push(num);
	var randomPokemon = new Pokemon(num);

	if (isOpponent) {
		document.getElementById("opponent-pokemon-image").src = randomPokemon.imageUrl;
	} else {
		document.getElementById("your-pokemon-image").src = randomPokemon.imageUrl;
	}

	return randomPokemon;
}