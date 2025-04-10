import { useState, useEffect } from "react";

const API_URL = "https://pokeapi.co/api/v2/";

export default function PokemonCard({data, setData} : {data: any, setData: any}) {
  let [id, setId] = useState<string>("1");

  useEffect(
    function () {

      async function obtenerPokemon() {
        const response = await fetch(`${API_URL}/pokemon/${id}`);
        const data = await response.json();
        return data;
      }

      obtenerPokemon().then((value) => {
        setData(value);
      });
    },
    [id]
  );

  return (
    <div className="flex flex-col items-center gap-4 border-2 bg-sky-50 border-blue-950 p-10 rounded-lg mx-10 my-4 w-fit">
      <p className="font-bold text-6xl text-center">Pokedex ID: <span className="text-sky-500">{data?.id}</span></p>
      <img
        draggable={false}
        className="h-[400px] w-[400px]"
        alt="La mejor imágen"
        src={data?.sprites?.front_default}
      />
      <input aria-label="input de busqueda" value={id} className="border-2 text-center bg-white" onChange={(e) => {
        const inputId = e.target.value;
        setId(inputId)
      }} />
      <p className="capitalize">{data?.name}</p>
      <div className="flex flex-row w-full items-center justify-around bg-blue-500 py-2 rounded-md">
        <button
          className="rounded-md px-10 hover:bg-blue-100 transition-colors disabled:bg-gray-300"
          type="button"
          onClick={() => {
            setId(String(+id - 1));
          }}
          disabled={+id == 1 ? true : false}
        >
          {"<-"}
        </button>
        <button
          className="rounded-md px-10 hover:bg-blue-100 transition-colors"
          onClick={() => {
            setId(String(+id + 1));
          }}
        >
          {"->"}
        </button>
      </div>
    </div>
  );
}
