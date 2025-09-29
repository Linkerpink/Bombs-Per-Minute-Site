"use client";

import { ProgressRing } from '@skeletonlabs/skeleton-react';
import { useEffect, useState } from 'react';


type DataEntry = {
  id: number;
  user: string;
  map: string;
  rank: string;
  accuracy: number;
  score: number;
  best_combo: number;
  notes_hit: number;
  bombs_hit: number;
  notes_missed: number;
};

export default function Page() {
  const [data, setData] = useState<DataEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost/bombs-per-minute/api.php')
      .then((res) => res.json())
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 justify-center">
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Bombs Per Minute Data</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="border-collapse border border-gray-750 w-full">
            <thead>
              <tr className="bg-gray-500">
                <th className="border p-2">ID</th>
                <th className="border p-2">User</th>
                <th className="border p-2">Map</th>
                <th className="border p-2">Rank</th>
                <th className="border p-2">Accuracy</th>
                <th className="border p-2">Score</th>
                <th className="border p-2">Best Combo</th>
                <th className="border p-2">Notes Hit</th>
                <th className="border p-2">Bombs Hit</th>
                <th className="border p-2">Notes Missed</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => (
                <tr key={entry.id} className="text-center">
                  <td className="border p-2">{entry.id}</td>
                  <td className="border p-2">{entry.user}</td>
                  <td className="border p-2">{entry.map}</td>
                  <td className="border p-2">{entry.rank}</td>
                  <td className="border p-2"><ProgressRing value={Number(entry.accuracy) || 0} max={100} showLabel /></td>
                  <td className="border p-2">{entry.score}</td>
                  <td className="border p-2">{entry.best_combo}</td>
                  <td className="border p-2">{entry.notes_hit}</td>
                  <td className="border p-2">{entry.bombs_hit}</td>
                  <td className="border p-2">{entry.notes_missed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}
