// Will want to pass in a list of numbers that the pokemon CANNOT be
function getRandomPokemon(restrictedIds, isOpponent){    
	var num = Math.floor((Math.random() * 150) + 1);
	while (restrictedIds.includes(num)) {
		num = Math.floor((Math.random() * 150) + 1);
	}
	var url = "http://pokeapi.co/api/v2/pokemon/" + num + "/";
	$.get(url, function(res) {
		console.log(res);
		var name = res["name"];
		console.log("name = " + name);
		var imageString = res["sprites"].front_default;
		console.log("image = " + imageString);
		if (isOpponent) {
			document.getElementById("opponent-pokemon-image").src = imageString;
		} else {
			document.getElementById("your-pokemon-image").src = imageString;
		}
	});
}