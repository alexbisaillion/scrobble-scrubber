"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState<{
    message: string;
    apiKeyUsed: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/hello") // Call our API route
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Next.js Secure API Example</h1>
      {data ? (
        <>
          <p className="text-lg">{data.message}</p>
          <p className="text-sm text-gray-500">
            API Key Status: {data.apiKeyUsed}
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
