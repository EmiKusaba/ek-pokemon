let arrayOfPokemon = [];

window.onload = function(){
  getPosts();
  console.log(arrayOfPokemon)
  // displayPokemon()
}
const getPosts = () => {
  fetch('https://pokeapi.co/api/v2/pokemon/')
  .then(res => {
    if(!res.ok) {
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
    if(!res.ok) {
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
const displayPokemon = () => {
  const leftPokemon = document.getElementById('left_pokemon')
  const rightPokemon = document.getElementById('right_pokemon')
  arrayOfPokemon.map(pokemon => {
    const li = document.createElement('li')
    const picture = document.createElement('img')
    const button = document.createElement('button')
    button.innerText = "make player"
    // const info = document.createElement('p')
    // info.innerText = ""
    // const infoText = `DOB: ${user.dob.date} STATE: ${user.location.state}`
    const pic = picture.setAttribute('src',`${pokemon.sprites.front_default}` )
    const text = document.createTextNode(`${pokemon.name}`)
    li.appendChild(text)
    li.appendChild(picture)
    li.appendChild(button)
    leftPokemon.appendChild(li)
    rightPokemon.append(li)
    
  })
}



