let assert = require('assert');
let arrayOfPokemon = [];
let leftPokemon = null;
let rightPokemon = null;
let gameOver = false;

window.onload = function () {
  getPokemonNames(0, 9);
  getPokemonNames(132, 19);
};

// Get a number of pokemon starting from the offset
const getPokemonNames = (offset = 0, num = 20) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${num}`)
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .then(data => data.results.map(pokemon => {
      // For each pokemon, get more data about it from API
      getPokemonData(pokemon);
      arrayOfPokemon.push(pokemon)
    }))
    .catch(err => console.log(`Error,  ${err}`));
};

const getPokemonData = (pokemon) => {
  fetch(pokemon.url)
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .then(data => {
      // Copy data about this pokemon to pokemon
      Object.assign(pokemon, data);
    })
    .catch(err => console.log(`Error,  ${err}`));
};

//display pokemon
const displayPokemon = (player) => {
  const pokemonList = document.getElementById(`${player}_pokemon`);
  if (pokemonList.hasChildNodes()) {
    return;
  }

  arrayOfPokemon.map(pokemon => {
    const div = makePokemonDiv(pokemon);
    pokemonList.appendChild(div);

    // Clicking on pokemon div chooses the pokemon for the arena
    div.addEventListener('click', () => {
      choosePokemon(player, pokemon);
      pokemonList.innerHTML = '';

      // If both players have chosen their pokemon, allow battle
      if (leftPokemon && rightPokemon) {
        const caption = document.createElement('h3');
        caption.id = 'arena_caption'
        const arenaDiv = document.getElementById('arena_mid');
        arenaDiv.appendChild(caption);

        caption.innerText = 'BATTLE!';
        caption.addEventListener('click', () => {
          battle(leftPokemon, rightPokemon);
          caption.removeEventListener('click', this);
        });
      }
    });
  });
};

// Make a div for a given pokemon
const makePokemonDiv = (pokemon) => {
  const div = document.createElement('div');
  div.classList.add('pokemon');

  const imgSpan = document.createElement('span');
  imgSpan.classList.add('flex', 'flex-horizontal-center');
  const img = document.createElement('img');
  img.classList.add('pokemon_img');
  img.setAttribute('src', `${pokemon.sprites.front_default}`);
  imgSpan.appendChild(img);
  div.appendChild(imgSpan);

  const name = document.createElement('div');
  name.classList.add('flex', 'flex-horizontal-center', 'name');
  let pokemonName = pokemon.name;
  pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1).toLowerCase();
  name.innerText = pokemonName;
  div.appendChild(name);

  return div;
};

//Choose this pokemon for the arena
const choosePokemon = (player, pokemon) => {
  const playerArenaDiv = document.getElementById(`${player}_arena_pokemon`);
  const pokemonDiv = makePokemonDiv(pokemon);

  // If game was over, reset
  if (gameOver) {
    reset();
  }

  // Allow changing pokemon
  if (playerArenaDiv.firstChild) {
    playerArenaDiv.firstChild.remove();
  }
  playerArenaDiv.appendChild(pokemonDiv);

  if (player == 'left') {
    leftPokemon = pokemon;
  } else {
    rightPokemon = pokemon;
  }
};

//To judge the who's win
const battle = (leftPokemon, rightPokemon) => {
  const leftScore = calculateScore(leftPokemon);
  const rightScore = calculateScore(rightPokemon);

  // Store information about left, right
  const left = {
    div: document.getElementById('left_arena_pokemon').firstChild,
    pokemon: leftPokemon
  }
  const right = {
    div: document.getElementById('right_arena_pokemon').firstChild,
    pokemon: rightPokemon
  }
  const caption = document.getElementById('arena_caption');

  const losers = [];
  if (leftScore === rightScore) {
    // Draw
    caption.innerText = "It's a draw!";
    losers.push(left, right);
  } else if (leftScore > rightScore) {
    // Left wins
    caption.innerText = "Left wins!";
    losers.push(right);
  } else {
    // Right wins
    caption.innerText = "Right wins!";
    losers.push(left);
  }

  losers.forEach((loser) => {
    const img = loser.div.getElementsByClassName('pokemon_img')[0];
    img.setAttribute('src', `${loser.pokemon.sprites.back_default}`);
    loser.div.classList.add('faded');
  });

  gameOver = true;
};

const calculateScore = (pokemon) => {
  // To keep it simple, we just sum up all stats
  const total = pokemon.stats.reduce((sum, x) => sum + x.base_stat, 0);
  return total;
};

//To reset the game
const reset = () => {
  const leftArena = document.getElementById('left_arena_pokemon');
  const rightArena = document.getElementById('right_arena_pokemon');
  const arenaMid = document.getElementById('arena_mid');
  leftArena.innerHTML = '';
  rightArena.innerHTML = '';
  arenaMid.innerHTML = '';

  leftPokemon = null;
  rightPokemon = null;
  gameOver = false;
};



//Unit tests

//test
if (typeof describe === 'function') {
  describe('getPokemonNames', function () {
    it('works in the basic case', () => {
      const fakefetch = url => {
      assert(url === 'https://pokeapi.co/api/v2/pokemon/123')
      return new Promise(function(resolve){

      })
    }
    getPokemonNames(fakefetch,123)
  });

//   describe('MakeRedTeam', function () {
//     it('should have a id, name, age, skillSet, placeBorn, canThrowBall, canDodgeBall, hasPaid, isHealthy, yearsExperience, mascot, teamcolor', function () {
//       let redTeam1 = new RedTeammate(2, 'Judy Twilight', 35, 'fishing', 'Louisville, Kentucky', true, true, true, true, 10, 'Tiger', 'Red');
//       assert.equal(redTeam1.id, 2);
//       assert.equal(redTeam1.name, "Judy Twilight");
//       assert.equal(redTeam1.age, 35);
//       assert.equal(redTeam1.skillSet, "fishing");
//       assert.equal(redTeam1.placeBorn, "Louisville, Kentucky");
//       assert.equal(redTeam1.canThrowBall, true);
//       assert.equal(redTeam1.canDodgeBall, true);
//       assert.equal(redTeam1.hasPaid, true);
//       assert.equal(redTeam1.isHealthy, true);
//       assert.equal(redTeam1.yearsExperience, 10);
//       assert.equal(redTeam1.mascot, "Tiger");
//       assert.equal(redTeam1.teamcolor, "Red");

//     });
//   });

//   describe('MakeBlueTeam', function () {
//     it('should have a id, name, age, skillSet, placeBorn, canThrowBall, canDodgeBall, hasPaid, isHealthy, yearsExperience, mascot, teamcolor', function () {
//       let blueTeam1 = new BlueTeammate(3, 'Argo Khon', 15, 'skating', 'Missouri', true, false, true, true, 1, 'Dog', 'blue');
//       assert.equal(blueTeam1.id, 3);
//       assert.equal(blueTeam1.name, "Argo Khon");
//       assert.equal(blueTeam1.age, 15);
//       assert.equal(blueTeam1.skillSet, "skating");
//       assert.equal(blueTeam1.placeBorn, "Missouri");
//       assert.equal(blueTeam1.canThrowBall, true);
//       assert.equal(blueTeam1.canDodgeBall, false);
//       assert.equal(blueTeam1.hasPaid, true);
//       assert.equal(blueTeam1.isHealthy, true);
//       assert.equal(blueTeam1.yearsExperience, 1);
//       assert.equal(blueTeam1.mascot, "Dog");
//       assert.equal(blueTeam1.teamcolor, "blue");
//     });
//   });
// }

