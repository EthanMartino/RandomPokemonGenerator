class Pokemon{
    pokedexNumber;
    name;
    types;
    moves;
    stats;
    sprite;
    abilities;
}



function getPokemon(pokedexNumber){
    let pokemon = new Pokemon();
    P.resource("/api/v2/pokemon/" + pokedexNumber) 
    .then(function(response) {
        console.log(response);
        pokemon.pokedexNumber = response.id;
        pokemon.name = capFirstLetter(response.name);
        pokemon.types = response.types;
        pokemon.moves = response.moves;
        pokemon.stats = response.stats;
        pokemon.sprite = response.sprites.front_default;
        pokemon.abilities = response.abilities;
        populatePokemon(pokemon);
    });
}

//Couldnt get the onclick envent to work correctly in JS so i just used HTML
/*
window.onload = function(){
    let randomButton = document.querySelector("#random-button");
    randomButton.onclick = getPokemon(Math.floor(Math.random() * 806));
} */

function populatePokemon(pokemon){
    clearForm();

    document.querySelector("#pokemon-name > h2").innerHTML = pokemon.name;

    document.querySelector("#pokedex-number > h3 > p").innerHTML = pokemon.pokedexNumber;

    document.querySelector("#pokemon-sprite > img").setAttribute("src", pokemon.sprite);

    for(let i = 0; i < pokemon.types.length; i++){
        let li = document.createElement("li");
        li.innerText = capFirstLetter(pokemon.types[i].type.name + " ");
        document.querySelector("#pokemon-types > ul").appendChild(li);
    }

    for(let i = 0; i < pokemon.abilities.length; i++){
        let li = document.createElement("li");
        li.innerText = capFirstLetter(pokemon.abilities[i].ability.name + " ");
        document.querySelector("#pokemon-abilities > ul").appendChild(li);
    }

    for(let i = 0; i < pokemon.moves.length; i++){
        let li = document.createElement("li");
        li.innerText = capFirstLetter(pokemon.moves[i].move.name + ", ");
        document.querySelector("#pokemon-moves > ul").appendChild(li);
    }

    for(let i = 0; i < pokemon.stats.length; i++){
        let li = document.createElement("li");
        li.innerText = capFirstLetter(pokemon.stats[i].stat.name) + ": " + pokemon.stats[i].base_stat + " ";
        document.querySelector("#pokemon-stats > ul").appendChild(li);
    }
}

/**
 * Capitalizes the first letter of the given string
 * @param {*} string 
 */
function capFirstLetter(string){
    let restOfName = "";
    for(let i = 1; i < string.length; i++){
        restOfName += string[i];
    }
    string = string[0].toUpperCase() + restOfName; 
    if(string == "Special-defense"){
        string = "Special Defense";
    }
    if(string == "Special-attack"){
        string = "Special Attack";
    }
    return string;
}

function clearForm(){
    document.querySelector("#pokemon-name > h2").innerHTML = "";

    document.querySelector("#pokedex-number > h3 > p").innerHTML = "";

    document.querySelector("#pokemon-types > ul").innerHTML = "";

    document.querySelector("#pokemon-abilities > ul").innerHTML = "";

    document.querySelector("#pokemon-moves > ul").innerHTML = "";

    document.querySelector("#pokemon-stats > ul").innerHTML = "";
}