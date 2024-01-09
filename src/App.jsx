import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://pokeapi.co/api/v2/pokemon/?limit=811";
import PokemonsList from "./components/PokemonsList";
import PokemonsPagination from "./components/PokemonsPagination";
import Header from "./components/Header";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [initialPokemons, setInitialPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [previusPage, setPreviusPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(20);

  const getPokemons = async (name = "") => {
    const res = await fetch(API_URL);
    const data = await res.json();

    const { results } = data;

    let currentButton = localStorage.getItem("currentButton");

    if (name.length == 0) {
      const getPokemonsData = results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const newData = await response.json();

        let id = newData.id;
        let name = newData.name;
        let exp = newData.base_experience;
        let type = newData.types[0].type.name;
        let abilities = newData.abilities[0].ability.name;
        let img = newData.sprites.other.dream_world.front_default;

        return {
          id,
          exp,
          img,
          type: type[0].toUpperCase() + type.slice(1), // capitalize the first letter
          name: name[0].toUpperCase() + name.slice(1),
          abilities: abilities[0].toUpperCase() + abilities.slice(1),
        };
      });
      setPokemons(await Promise.all(getPokemonsData));
      setInitialPokemons(await Promise.all(getPokemonsData));
      setCurrentPage(currentButton);
    } else {
      setPokemons(
        pokemons.filter((pokemon) => {
          return pokemon.name.toLowerCase().includes(name.toLocaleLowerCase());
        })
      );
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  const lastPostIndex = currentPage * pokemonsPerPage;
  const firstPostIndex = lastPostIndex - pokemonsPerPage;
  const currentPosts = pokemons.slice(firstPostIndex, lastPostIndex);

  return (
    <main className="container">
      <Header getPokemons={getPokemons} />
      <PokemonsList pokemons={currentPosts} />
      <PokemonsPagination
        totalPokemons={pokemons.length}
        pokemonsPerPage={pokemonsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
}

export default App;
