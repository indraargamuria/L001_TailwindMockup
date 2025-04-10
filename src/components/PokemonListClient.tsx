"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type Pokemon = {
  id: number;
  name: string;
  image: string;
  type: string;
  description: string;
};

export default function PokemonListClient() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPokemonList() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=500");
      const data = await res.json();

      const detailed = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const resDetail = await fetch(pokemon.url);
          const detail = await resDetail.json();

          const resSpecies = await fetch(detail.species.url);
          const species = await resSpecies.json();

          const flavorText = species.flavor_text_entries.find(
            (entry: any) => entry.language.name === "en"
          )?.flavor_text.replace(/\f/g, " ");

          return {
            id: detail.id,
            name: detail.name,
            image: detail.sprites.other["official-artwork"].front_default,
            type: detail.types.map((t: any) => t.type.name).join(", "),
            description: flavorText || "No description available.",
          };
        })
      );

      setPokemons(detailed);
      setLoading(false);
    }

    getPokemonList();
  }, []);

  if (loading) {
    return (
      <div className="col-span-3 text-center text-pink-500 font-semibold animate-pulse">
        Loading 100 Pokémon...
      </div>
    );
  }

  return (
    <>
      {pokemons.map((pokemon) => (
        <div
          key={pokemon.id}
          className="bg-pink-100 rounded-3xl shadow-md p-5 flex flex-col items-center text-center transition-transform hover:scale-105 hover:shadow-xl"
        >
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={120}
            height={120}
            className="mb-4"
          />
          <h2 className="capitalize text-2xl font-bold text-pink-700">
            {pokemon.name}
          </h2>
          <p className="text-sm mt-1 text-gray-700 italic">Type: {pokemon.type}</p>
          <p className="text-xs mt-2 text-gray-600">{pokemon.description}</p>
        </div>
      ))}
    </>
  );
}
