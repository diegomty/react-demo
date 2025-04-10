import React, { useState } from "react";

const API_URL = "https://pokeapi.co/api/v2/";

export default function Obtener() {
  const [data, setData] = useState<any>(null); //guarda  los daots que devuelve la Api del pokemon
  const [nombre, setNombre] = useState<string>(""); // guarda el texto que  el usuario escribe en el  input
  const [buscado, setBuscado] = useState<string>(""); // valor confirmado al hacer click


  // función que se ejecuta al hacer click en el botón "Buscar"
  const handleBuscarClick = async () => {
    if (nombre.trim() === "") return;

    try {
      const response = await fetch(`${API_URL}pokemon/${nombre.toLowerCase()}`);
      if (!response.ok) throw new Error("Pokémon no encontrado");

      const result = await response.json();// convierte la respuesta a formato JSON
      setData(result); // guarda los datos del pokemon en el estado
      setBuscado(nombre); // actualiza el valor buscado con éxito
      //Si  algo   llega a fallar,  borra los datos y muestra un mensaje de error
    } catch (error) {
      setData(null);
      alert("No se encontró el Pokémon.");
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <input
          aria-label="Input de nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ingresa nombre o ID"
          style={{ padding: "6px", borderRadius: "4px" }}
        />
        <button
          onClick={handleBuscarClick}
          style={{
            backgroundColor: "#fff",
            color: "#000",
            border: "none",
            padding: "6px 12px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Buscar
        </button>
      </div>

      {data && (
        <div>
          <p>
            <strong>{data.name}</strong> - Pokedex ID: {data.id}
          </p>
          <img alt="La mejor imágen" src={data.sprites?.back_default} />
        </div>
      )}
    </div>
  );
}

