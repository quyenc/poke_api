var baseUrl='pokemonapi.co/ap/v1'

requestPokemon();

requestPokemon = function(Pokemon){
	
	$.get("http://pokeapi.co/api/v2/pokemon/charizard/", function(data, status){
		alert();
	})

}




randomInterval = function(min, max)
{
	return Math.floor(Math.random()*(max-min+1)+min);
}