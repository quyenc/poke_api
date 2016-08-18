// Will want to pass in a list of numbers that the pokemon CANNOT be
function getRandomPokemon(restrictedIds){    
	var num = Math.floor((Math.random() * 150) + 1);
	while (restrictedIds.includes(num)) {
		num = Math.floor((Math.random() * 150) + 1);
	}
	var url = "http://pokeapi.co/api/v2/pokemon/" + num + "/";
	$.get(url, function(res) {
		var name = res["name"];
		console.log("name = " + name);
	});
}