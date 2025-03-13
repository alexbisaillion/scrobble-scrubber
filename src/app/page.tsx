"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [data, setData] = useState<number | null>(null);

  const fetchGreeting = async () => {
    const res = await fetch(`/api/numTracks?user=${encodeURIComponent(name)}`);
    const result = await res.json();
    setData(result);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Next.js Dynamic API Example</h1>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your user"
        className="border p-2 rounded"
      />

      <button
        onClick={fetchGreeting}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Get Greeting
      </button>

      {data && <p className="text-lg">{data}</p>}
    </div>
  );
}
