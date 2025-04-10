import Image from "next/image";
//import styles from "./page.module.css";
import './globals.css' // adjust path if needed
import { Card } from '@/components/Card';
import { cards } from '@/data/dummydata';

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
}

export default async function Home() {
  const users = await getUsers();

  return (
    <div>
      <div className="grid grid-cols-6 mt-2">
        <div></div>
        <div className="grid grid-cols-3 gap-2 col-span-4 col-start-2">
          {cards.map((card, index) => (
            <Card key={index} title={card.title} description={card.description} />
          ))}

          {/* New Cards from Public API */}
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
        </div>
        <div></div>
      </div>
    </div>
  );
}
