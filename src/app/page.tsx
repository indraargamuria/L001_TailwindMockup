import './globals.css'
import { Card } from '@/components/Card';
import { cards } from '@/data/dummydata';
import PokemonListClient from '@/components/PokemonListClient';

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export default async function Home() {
  const users = await getUsers();

  return (
    <div className="grid grid-cols-6 mt-2">
      <div></div>
      <div className="grid grid-cols-3 gap-6 col-span-4 col-start-2">

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

        {/* 🔹 Pokémon Cards (Client-side) */}
        <PokemonListClient />

      </div>
      <div></div>
    </div>
  );
}
