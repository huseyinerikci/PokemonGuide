//Html elemanlara erişme
const pokeContainer = document.querySelector(".poke-container");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".searchBtn");
const searchInput = document.querySelector(".searchInput");

const pokemonCount = 151;

//Colors
const bg_color = {
  grass: "#8BD369",
  fire: "#FF603F",
  water: "#3399FF",
  bug: "#AABB22",
  normal: "#AAAA99",
  flying: "#9AA8FA",
  poison: "#B76EA4",
  electric: "#FFD34E",
  ground: "#E2C56A",
  fairy: "#F1A8EC",
  psychic: "#FF6EA4",
  fighting: "#C56E5C",
  rock: "#C5B679",
  dragon: "#7766EE",
  ice: "#66CCFF",
};

//butona tıklayınca acma-kapama işlemi
searchBtn.addEventListener("click", () => {
  search.classList.toggle("active");
});

//inputa girilen değere göre veri getirme
searchInput.addEventListener("input", (e) => {
  const searchValue = searchInput.value.toLowerCase();
  const pokemonNames = document.querySelectorAll(".poke-name");

  pokemonNames.forEach((pokeName) => {
    if (pokeName.innerHTML.toLowerCase().includes(searchValue)) {
      pokeName.parentElement.parentElement.style.display = "block";
    } else {
      pokeName.parentElement.parentElement.style.display = "none";
    }
  });
});

const fetchPokemons = async () => {
  for (let i = 1; i < pokemonCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}
`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data);
};
fetchPokemons();

const createPokemonCard = (pokemon) => {
  const pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add("pokemon");

  const pokemonId = pokemon.id.toString().padStart(3, "0");
  const pokemonType = pokemon.types[0].type.name;

  //pokemon tipine göre arkaplan rengi eşleşme
  const pokemonBg = bg_color[pokemonType];
  pokemonDiv.style.backgroundColor = `${pokemonBg}`;

  const pokemonDivHTML = `
  <div class="image-container">
  <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
            alt="pokemon-img"
          />
 
          
        </div>
        <div class="poke-info">
          <span class="poke-id">#${pokemonId}</span>
          <h3 class="poke-name">${pokemon.name}</h3>
          <div class="small">
            <small class="poke-exp">
              <i class="fa-solid fa-flask"></i>
              <span> ${pokemon.base_experience} Exp</span>
            </small>
            <small class="poke-weight">
              <i class="fa-solid fa-weight-scale"></i>
              <span> ${pokemon.weight} Kg</span>
            </small>
          </div>
          <div class="poke-type">
            <i class="fa-brands fa-uncharted"></i> ${pokemonType}
          </div>
        </div>`;

  pokemonDiv.innerHTML = pokemonDivHTML;
  pokeContainer.appendChild(pokemonDiv);
};
