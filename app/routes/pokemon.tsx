import { useState } from "react";
import PokemonCard from "./components/PokemonCard";
import type { PokeResponse } from "./interfaces/pokemon";

//definimos la ruta de pokemon  
export default function PokemonRoute() {
  const [data, setData] = useState<PokeResponse | undefined>();//declaracion de variable de estado y funcion

  return (
    <div className="text-5xl">
      <p className="bg-blue-600 text-white py-2 text-center">Buscador de Pokémon</p>
      <div className="flex flex-row">
        <PokemonCard data={data} setData={setData} /> {/* Pass data and setData to PokemonCard */}
        <div className="ml-4"> {/* Contenedor para la informacion de pokemon. la clase m1-4 agregara  un margen izquierdo para separalo visualmente */}
          <p>Datos:</p>
          {data && (
            <ul>
              <li>Name: {data.name}</li>
              <li>ID: {data.id}</li>
              <li>Height: {data.height}</li>
              <li>Weight: {data.weight}</li>
              <li>
                Types:
                <ul>
                  {data.types?.map((type, index) => (
                    <li key={index}>{type.type.name}</li>
                  ))}
                </ul>
              </li>
              <li>
                Abilities:
                <ul>
                  {data.abilities?.map((ability, index) => (
                    <li key={index}>{ability.ability?.name || "Unknown Ability"}</li>
                  ))}
                </ul>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}