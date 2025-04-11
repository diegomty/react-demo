import { useState, useEffect } from "react";
import type { PokeResponse } from "./interfaces/pokemon";

const API_URL = "https://pokeapi.co/api/v2/";

export default function PokemonRoute() {
  const [pokemonList, setPokemonList] = useState<PokeResponse[]>([]);// Estado para almacenar la lista de Pokémon

  useEffect(() => {
    async function obtenerPokemon() {
      // Obtener la cantidad total de Pokémon
      const countResponse = await fetch(`${API_URL}/pokemon-species`);
      const countData = await countResponse.json();
      const totalPokemonCount = countData.count;

      const response = await fetch(`${API_URL}/pokemon?limit=${totalPokemonCount}`); // Obtiene todos los Pokémon
      const data = await response.json();
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon: { url: string; }) => {
          const response = await fetch(pokemon.url);
          return await response.json();
        })
      );
      setPokemonList(pokemonDetails);
    }

    obtenerPokemon();
  }, []);

  return (
    <div className="text-5xl">
      <p className="bg-blue-600 text-white py-2 text-center">Lista de Pokémon</p>
      <div className="flex justify-end"> {/* Cambiado a flex sin wrap y añadido justify-end */}
        <div className="flex flex-wrap justify-start w-3/4"> {/* Contenedor para la lista, ocupa 3/4 del ancho */}
          {pokemonList.map((pokemon) => (
            <div key={pokemon.id} className="w-64 p-4 m-4 border rounded">
              <img
                src={pokemon.sprites?.front_default}
                alt={pokemon.name}
                className="mx-auto"
              />
              <p className="text-center text-xl font-bold">{pokemon.name}</p>
              <p>ID: {pokemon.id}</p>
              <p>Height: {pokemon.height}</p>
              <p>Weight: {pokemon.weight}</p>
              <div>
                Types:
                <ul>
                  {pokemon.types?.map((type, index) => (
                    <li key={index}>{type.type.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                Abilities:
                <ul>
                  {pokemon.abilities?.map((ability, index) => (
                    <li key={index}>{ability.ability?.name || "Unknown Ability"}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}