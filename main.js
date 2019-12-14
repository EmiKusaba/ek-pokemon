let arrayOfPokemon = [];
let leftPokemon = null;
let rightPokemon = null;

window.onload = function () {
  getAllPokemon();
};

// Get list of all pokemon
const getAllPokemon = () => {
  fetch('https://pokeapi.co/api/v2/pokemon/')
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText)
      } return res.json()
    })
    .then(data => data.results.map(pokemon => {
      // For each pokemon, get more data about it from API
      getPokemonData(pokemon);
      arrayOfPokemon.push(pokemon)
    }))
    .catch(err => console.log(`Error,  ${err}`));
};

// Get more data about each pokemon
const getPokemonData = (pokemonObj) => {
  fetch(pokemonObj.url)
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText)
      } return res.json()
    })
    .then(data => {
      // Copy data about this pokemon to pokemonObj
      Object.assign(pokemonObj, data);
    })
    .catch(err => console.log(`Error,  ${err}`));
};

//display pokemon
const displayPokemon = (player) => {
  const pokemonList = document.getElementById(`${player}_pokemon`);

  arrayOfPokemon.map(pokemonObj => {
    const div = document.createElement('div');
    const hdr = document.createElement('span');
    const img = document.createElement('img');
    pokemonList.append(div);
    div.appendChild(hdr);
    div.appendChild(img);

    // To change Pokemon name's first letter as uppercase and rest of letters lowercase
    let pokemonName = pokemonObj.name;
    pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1).toLowerCase();
    hdr.innerText = pokemonName;

    //when I click the charactor, callback
    img.setAttribute('src', `${pokemonObj.sprites.front_default}`);
    img.addEventListener('click', () => {
      makePlayer(player, pokemonObj);
      pokemonList.innerHTML = '';

      //when both player select the pokemon, show battle button. 
      if(leftPokemon && rightPokemon) {
        const battle = document.createElement('h3');
        const arenaDiv = document.getElementById('arena_battle');
        arenaDiv.appendChild(battle);
        battle.innerText = 'BATTLE!';
      }
    });
  });
};

//Show the selection
const makePlayer = (player, pokemonObj) => {
  const playerArenaDiv = document.getElementById(`${player}_arena_pokemon`);
  const img = document.createElement('img');
  img.setAttribute('src', `${pokemonObj.sprites.front_default}`);

  // Allow changing pokemon
  if(playerArenaDiv.firstChild) {
    playerArenaDiv.firstChild.remove();
  }
  //add new pokemon
  playerArenaDiv.appendChild(img);

  //
  if(player == 'left') {
    leftPokemon = pokemonObj;
  } else {
    rightPokemon = pokemonObj;
  }
};


//To judge the who's win

//To reset the game



