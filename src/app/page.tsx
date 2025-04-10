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
      const res = await fetch(pokemon.url);
      return res.json();
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
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 flex flex-col items-center transition-transform hover:scale-105"
            >
              <Image
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
                width={100}
                height={100}
                className="mb-2"
              />
              <h2 className="capitalize text-xl font-semibold text-gray-800 dark:text-white">
                {pokemon.name}
              </h2>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                Type: {pokemon.types.map((t: any) => t.type.name).join(", ")}
              </div>
            </div>
          ))}

        </div>
        <div></div>
      </div>
    </div>
  );
}
