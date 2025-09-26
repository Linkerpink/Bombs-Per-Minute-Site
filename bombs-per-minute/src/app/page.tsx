import Image from "next/image";

export default async function Home() {
  const res = await fetch("http://localhost/game-api/get_scores.php", {
    next: { revalidate: 60 } // optional caching
  });
  const scores: { player_name: string; score: number; created_at: string }[] =
    await res.json();

  return (
    <main>
      <h1>Leaderboard</h1>
      <ul>
        {scores.map((s, i) => (
          <li key={i}>{s.player_name} – {s.score}</li>
        ))}
      </ul>
    </main>
  );
}
