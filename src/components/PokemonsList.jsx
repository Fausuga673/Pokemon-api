import React from "react";

const PokemonsList = ({ pokemons }) => {
  return (
    <section className="pokemons">
      {pokemons.map(({ id, exp, img, name, type, abilities }) => (
        <article className="pokemons__pokemon" key={id}>
          <h2 className="pokemons__pokemon--name">{name}</h2>
          <div className="pokemons__pokemon--img">
            <img src={img} alt={name} />
          </div>
          <div className="pokemons__pokemon--stats">
            <p>Type: {type}</p>
            <p>Ability: {abilities}</p>
            <p>EXP: {exp}</p>
          </div>
        </article>
      ))}
    </section>
  );
};

export default PokemonsList;
