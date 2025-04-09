// components/Card/Card.tsx
type CardProps = {
    title: string;
    description: string;
  };
  
  export default function Card({ title, description }: CardProps) {
    return (
      <div className="rounded-xl shadow-md p-4 bg-white">
        <img src="https://picsum.photos/600" className="h-60 w-full object-bottom object-cover" alt="" />
        <h2 className="text-xl font-bold text-teal-800">{title}</h2>
        <p className="text-gray-800 text-sm">{description}</p>
        <button className="bg-gray-700 w-full rounded text-white p-2 shadow hover:bg-orange-600 transition-colors">Add</button>
      </div>
    );
  }
  