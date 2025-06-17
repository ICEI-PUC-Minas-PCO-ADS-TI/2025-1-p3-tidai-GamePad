import React from "react";

export default function ProfileStats({ userGames = [] }) {
  const playedCount = userGames.filter(
    (g) =>
      g.statuses &&
      g.statuses.some((s) => ["playing", "played"].includes(s.toLowerCase()))
  ).length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="text-zinc-300 font-semibold mb-2">
          Total de jogos jogados
        </h4>
        <div className="text-5xl font-bold text-white mb-2">{playedCount}</div>
      </div>
    </div>
  );
}
