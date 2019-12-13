let arrayOfPokemon = [];
let arenaOfPokemon = [];
window.onload = function () {
  getPosts();
  console.log(arrayOfPokemon)
  // displayPokemon()
}
const getPosts = () => {
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
    .catch(err => console.log(`Error,  ${err}`))
}

const getPokemonData = (pokemonObj) => {
  fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonObj.name + '/')
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
}

//display pokemon
const displayPokemon = (dir) => {
  const pokemonList = document.getElementById(`${dir}_pokemon`);

  arrayOfPokemon.map(pokemon => {
    const li = document.createElement('li')
    const picture = document.createElement('img')
    const button = document.createElement('button')
    button.innerText = "make player"
    button.addEventListener("click", function () {
      makeplayer(pokemon.name)
    })

    // const info = document.createElement('p')
    // info.innerText = ""
    // const infoText = `DOB: ${user.dob.date} STATE: ${user.location.state}`
    picture.setAttribute('src', `${pokemon.sprites.front_default}`)
    const text = document.createTextNode(`${pokemon.name}`)
    li.appendChild(text)
    li.appendChild(picture)
    li.appendChild(button)
    // leftPokemon.append(li)
    pokemonList.append(li)

  })
}

//Show the selection
const makeplayer = (id) => {
  const battle = document.getElementById("battle");
  const findPlayer = arrayOfPokemon.find(pokemon => pokemon.name == id)
  console.log(findPlayer)

  arrayOfPokemon.push(arenaOfPokemon)
  const li = document.createElement("li")
  li.appendChild(document.createTextNode(arenaOfPokemon))
  li.style.border = "1px solid red"
  const picture = document.createElement('img')
  picture.setAttribute('src', `${pokemon.sprites.front_default}`)
  li.appendChild(picture)
  battle.append(li)
}


//To judge the who's win

//To reset the game



