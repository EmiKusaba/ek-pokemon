let assert = require('assert');
let arrayOfPokemon = [];
let error = null;

// Get a number of pokemon starting from the offset
const getPokemonNames = (fetch, offset = 0, num = 20) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${num}/`)
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .then(data => data.results.map(pokemon => {
      arrayOfPokemon.push(pokemon)
    }))
    .catch(err => {
      console.log(err);
    });
};

const getPokemonData = (fetch, pokemon) => {
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

// //To judge the who's win
const battle = (leftPokemon, rightPokemon) => {
  const leftScore = calculateScore(leftPokemon);
  const rightScore = calculateScore(rightPokemon);

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
  const calculateScore = (pokemon) => {
    // To keep it simple, we just sum up all stats
    const total = pokemon.stats.reduce((sum, x) => sum + x.base_stat, 0);
    return total;
  };




//Unit tests

if (typeof describe === 'function') {
  describe('getPokemonNames', function () {
    it('Basic', () => {
      const fakeFetch = (url) => {
        assert.equal('https://pokeapi.co/api/v2/pokemon/?offset=30&limit=20/', url);
        return new Promise(() => {});
      };
      getPokemonNames(fakeFetch, 30, 20);
    });

    it('Out of range request', () => {
      arrayOfPokemon = [];
      error = null;
      const fakeFetch = (url) => {
        const MAX_POKEMON = 807;
        const params = new URLSearchParams(url.split("?")[1].split("/")[0]);
        const offset = params.get("offset") || 0;
        const limit = params.get("limit") || 0;
        // Out of range
        if (offset + limit > MAX_POKEMON) {
          return Promise.resolve({
            res: {
              ok: false,
              statusText: `Out of range: offset=${offset} limit=${limit}`
            }
          });
        }    
        return Promise.resolve({});    
      };

      getPokemonNames(fakeFetch, 808, 20);
      assert.equal(0, arrayOfPokemon.length);
      // assert.equal(`Out of range: offset=${offset} limit=${limit}`, error);

      //know winner
      if (typeof describe === 'function') {
        describe('calculateScore', function () {
      it('should be able to calculate score', () => {
        const pikacyu = getPokemonData
        const total = pokemon.stats.reduce((sum, x) => sum + x.base_stat, 0);
        return total;
      })
    });


  });
}



//Hypothetical 4
//Hypothetical 5