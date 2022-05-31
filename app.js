const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

//BUSCANDO OS POKEMONS
const fetchPokemon = () => {

    const pokemonPromises = [];

    for(let i=1;i<=150; i++){
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }

    Promise.all(pokemonPromises)
        .then(pokemons => 
            {
                //REDUZIR UM ARRAY EM STRING
                return pokemons.reduce( (accumulator, pokemon) => {
                    const types = pokemon.types.map(typeInfo => typeInfo.type.name);
                    accumulator += `<li class="card ${types[0]}">
                        <img class="card-image " alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"/>

                        <h2 class="card-title"> ${pokemon.id}. ${pokemon.name}</h2>

                        <p class="card-subtitle">${types.join(' | ')}
                        </p>    
                    </li>`
                    return accumulator
                }, ''); 
                //console.log(pokemons)

                
            })
            .then(pokemons => {
                const ul = document.querySelector('[data-js="pokedex"]');
                ul.innerHTML = pokemons
            })
  /*
    fetch(url)
        .then(response => response.json())
        .then(pokemon => {
            console.log(pokemon);
            //os dados do pokemon aparecem no console.
        })
  */
}

//INVOCANDO A FUNÇÃO
fetchPokemon();

//NO HTML, TEMOS UMA UL VAZIA.
//Vamos fazer com que cada ul receba um pokemon.