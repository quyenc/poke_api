function getRandomPokemon(){    
	$.get("http://pokeapi.co/api/v2/pokemon/3/", function(res) {
		var name = res["name"];
		var num = Math.floor((Math.random() * 150) + 1);
		console.log("name = " + name);
	});
}