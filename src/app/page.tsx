import Image from "next/image";
import './globals.css'
import { Card } from '@/components/Card';
import { cards } from '@/data/dummydata';

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
}

async function getPokemonList() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=9");
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

  return detailed;
}

export default async function Home() {
  const [users, pokemons] = await Promise.all([getUsers(), getPokemonList()]);

  return (
    <div>
      <div className="grid grid-cols-6 mt-2">
        <div></div>
        <div className="grid grid-cols-3 gap-4 col-span-4 col-start-2">

          {/* 🔹 Dummy Cards */}
          {cards.map((card, index) => (
            <Card key={index} title={card.title} description={card.description} />
          ))}

          {/* 🔹 User Cards */}
          {users.map((user: any) => (
            <div
              key={user.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4"
            >
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">{user.name}</h2>
              <p className="text-gray-600 dark:text-gray-300">📧 {user.email}</p>
              <p className="text-gray-600 dark:text-gray-300">📞 {user.phone}</p>
            </div>
          ))}

          {/* 🔹 Pokémon Cards */}
          {pokemons.map((pokemon: any) => (
            <div
              key={pokemon.id}
              className="bg-pink-100 dark:bg-pink-900 rounded-3xl shadow-md p-5 flex flex-col items-center text-center transition-transform hover:scale-105 hover:shadow-xl"
            >
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                width={120}
                height={120}
                className="mb-4"
              />
              <h2 className="capitalize text-2xl font-bold text-pink-700 dark:text-pink-200">
                {pokemon.name}
              </h2>
              <p className="text-sm mt-1 text-gray-700 dark:text-gray-300 italic">
                Type: {pokemon.type}
              </p>
              <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">
                {pokemon.description}
              </p>
            </div>
          ))}


        </div>
        <div></div>
      </div>
    </div>
  );
}
