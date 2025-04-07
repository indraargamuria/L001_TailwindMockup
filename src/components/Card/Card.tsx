// components/Card/Card.tsx
type CardProps = {
    title: string;
    description: string;
  };
  
  export default function Card({ title, description }: CardProps) {
    return (
      <div className="rounded-xl shadow-md p-4 bg-white">
        <h2 className="text-xl font-bold text-teal-800">{title}</h2>
        <p className="text-gray-800 text-sm">{description}</p>
      </div>
    );
  }
  