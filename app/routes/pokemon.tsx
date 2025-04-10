import { useState } from "react";
import PokemonCard from "./components/PokemonCard";
import type { PokeResponse } from "./interfaces/pokemon";

export default function PokemonRoute(){
  const [data, setData] = useState<PokeResponse | undefined>();
  return (
    <div className="text-5xl">
      <p className="bg-blue-600 text-white py-2 text-center">Buscador de Pokémon</p>
      <div className="flex flex-row">
      <PokemonCard data={data} setData={setData} />
      <p>Datos: {}</p>
      <ul>
      </ul>
      </div>
    </div>
  )
}