import Image from "next/image";
//import styles from "./page.module.css";
import './globals.css' // adjust path if needed
import { Card } from '@/components/Card';
import { cards } from '@/data/dummydata';

export default function Home() {
  return (
    <div>
      <div className="flex grid grid-cols-3 mt-2">
        <div></div>
        <div className="flex grid grid-cols-3 gap-2">
          {/* <div className="card">
            <img src="https://picsum.photos/1000" alt="" />
            <span>a</span>
          </div> */}
          {cards.map((card, index) => (
            <Card key={index} title={card.title} description={card.description} />
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
}
