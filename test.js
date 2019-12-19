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
    .then(data => {
      data.results.map(pokemon => {
        arrayOfPokemon.push(pokemon)
      })
    })
    .catch(err => {
      error = err.message;
    });
};

// //To judge the who's win
const battle = (leftPokemon, rightPokemon) => {
  const leftScore = calculateScore(leftPokemon);
  const rightScore = calculateScore(rightPokemon);
  if (leftScore === rightScore) {
    return "draw";
  } else if (leftScore > rightScore) {
    return "left";
  } else {
    return "right";
  }
};

const calculateScore = (pokemon) => {
  // To keep it simple, we just sum up all stats
  const total = pokemon.stats.reduce((sum, x) => sum + x.base_stat, 0);
  return total;
};

//Unit tests

if (typeof describe === 'function') {
  describe('getPokemonNames', function () {
    it('Correct url', () => {
      const fakeFetch = (url) => {
        assert.equal('https://pokeapi.co/api/v2/pokemon/?offset=30&limit=20/', url);
        return new Promise(() => { });
      };
      getPokemonNames(fakeFetch, 30, 20);
    });

    it('Out of range request', () => {
      arrayOfPokemon = [];
      error = null;
      const fakeFetch = (url) => {
        const MAX_POKEMON = 151;
        const params = new URLSearchParams(url.split("?")[1].split("/")[0]);
        const offset = params.get("offset") || 0;
        const limit = params.get("limit") || 0;
        // Out of range
        if (offset + limit > MAX_POKEMON) {
          return Promise.resolve({
            ok: false,
            statusText: `Out of range: offset=${offset} limit=${limit}`
          });
        }
        return Promise.resolve({
          ok: true,
          json: () => {
            results: ["Mewtwo"];
          }
        });
      };

      getPokemonNames(fakeFetch, 140, 20)
        .then(() => {
          assert.equal(0, arrayOfPokemon.length);
          assert.equal("Out of range: offset=140 limit=20", error);
        });
    });

    it('Handle data from API', () => {
      arrayOfPokemon = [];
      error = null;
      const fakeFetch = (url) => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            results: ["Articuno", "Moltres", "Zapdos"]
          })
        });
      };

      getPokemonNames(fakeFetch, 10, 3)
        .then(() => {
          assert.equal(null, error);
          assert.equal(3, arrayOfPokemon.length);
          assert(["Articuno", "Moltres", "Zapdos"].every((x, i) => {
            return x === arrayOfPokemon[i];
          }));
        });
    });

    const rattata = {
      name: "Rattata",
      stats: [
        {
          name: "Strength",
          base_stat: 10
        },
        {
          name: "Speed",
          base_stat: 20
        },
        {
          name: "Defence",
          base_stat: 30
        },
      ]
    };

    const mew = {
      name: "Mew",
      stats: [
        {
          name: "Strength",
          base_stat: 100
        },
        {
          name: "Speed",
          base_stat: 200
        },
        {
          name: "Defence",
          base_stat: 300
        },
      ]
    };

    describe('calculateScore', function () {
      it("Correct score calculation", () => {
        assert.equal(60, calculateScore(rattata))
      });
    });

    describe('battle', function () {
      it("Left wins", () => {
        assert.equal("left", battle(mew, rattata));
      });
      it("Right wins", () => {
        assert.equal("right", battle(rattata, mew));
      });
      it("Draw", () => {
        assert.equal("draw", battle(mew, mew));
      });
    });
  });
}



//Hypothetical 4
//Hypothetical 5