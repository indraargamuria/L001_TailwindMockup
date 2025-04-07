import Image from "next/image";
//import styles from "./page.module.css";
import './globals.css' // adjust path if needed

export default function Home() {
  return (
    <div>
      <div className="flex grid grid-cols-3 mt-2">
        <div></div>
        <div className="flex grid grid-cols-3 gap-2">
          <div className="text-blue-300 shadow p-1">Hello World</div>
          <div className="text-orange-300 shadow p-1">Hello World</div>
          <div className="text-red-300 shadow p-1">Hello World</div>
          <div className="text-blue-300 shadow p-1">Hello World</div>
          <div className="text-orange-300 shadow p-1">Hello World</div>
          <div className="text-red-300 shadow p-1">Hello World</div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
