"use client";

import { useState } from "react";
import { spots, filterByWeather, pickRandom, type Spot } from "./data";

type Weather = "sunny" | "rainy";

// ─── Card ─────────────────────────────────────────────────────────────────────

function SpotCard({ spot, rank }: { spot: Spot; rank: number }) {
  const isIndoor = spot.tags.includes("屋内");
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      {/* rank + name */}
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-xs font-bold text-green-500 w-5 shrink-0">
          {rank}
        </span>
        <h2 className="font-bold text-base leading-snug text-gray-900">
          {spot.name}
        </h2>
      </div>

      {/* note */}
      <p className="text-sm text-gray-500 mb-3 pl-7">{spot.note}</p>

      {/* tags */}
      <div className="flex flex-wrap gap-1.5 pl-7 mb-3">
        {spot.tags.map((tag) => (
          <span
            key={tag}
            className={`text-xs px-2.5 py-0.5 rounded-full ${
              tag === "雨OK"
                ? "bg-blue-50 text-blue-600"
                : isIndoor
                ? "bg-green-50 text-green-700"
                : "bg-orange-50 text-orange-600"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* time */}
      <div className="pl-7 flex items-center gap-1 text-xs text-gray-400">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" d="M12 6v6l4 2" />
        </svg>
        移動 {spot.time}
      </div>

      {/* station */}
      <div className="pl-7 flex items-center gap-1 text-xs text-gray-400 mt-1">
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {spot.nearestStation}・{spot.distance}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [results, setResults] = useState<Spot[] | null>(null);

  const handleSearch = () => {
    const pool = weather ? filterByWeather(weather) : spots;
    setResults(pickRandom(pool, 3));
  };

  const handleReset = () => {
    setWeather(null);
    setResults(null);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 pt-10 pb-16">

        {/* Header */}
        <div className="mb-7">
          <h1 className="text-xl font-bold text-gray-900 leading-snug">
            🗺️ 今すぐ行ける<br />子供スポット
          </h1>
          <p className="text-sm text-gray-400 mt-1">東京エリア · 3件提案</p>
        </div>

        {/* Weather selector */}
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          今日の天気
        </p>
        <div className="flex gap-3 mb-6">
          {(["sunny", "rainy"] as Weather[]).map((w) => {
            const label = w === "sunny" ? "☀️　晴れ" : "🌧️　雨";
            const active = weather === w;
            return (
              <button
                key={w}
                onClick={() => { setWeather(w); setResults(null); }}
                className={`flex-1 py-3 rounded-xl text-sm font-medium border-2 transition-all ${
                  active
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-green-300"
                }`}
              >
                {label}
              </button>
            );
          })}
          <button
            onClick={() => { setWeather(null); setResults(null); }}
            className={`px-3 py-3 rounded-xl text-sm border-2 transition-all ${
              weather === null
                ? "border-green-500 bg-green-500 text-white"
                : "border-gray-200 bg-white text-gray-400 hover:border-green-300"
            }`}
          >
            どちらでも
          </button>
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="w-full py-4 rounded-xl bg-green-500 text-white font-bold text-base shadow-sm active:scale-95 transition-transform hover:bg-green-600"
        >
          探す →
        </button>

        {/* Results */}
        {results !== null && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-gray-700">
                {results.length > 0 ? "おすすめ 3 件" : "見つかりませんでした"}
              </p>
              <button
                onClick={handleReset}
                className="text-xs text-gray-400 underline underline-offset-2"
              >
                リセット
              </button>
            </div>

            <div className="space-y-4">
              {results.map((spot, i) => (
                <SpotCard key={spot.name} spot={spot} rank={i + 1} />
              ))}
            </div>

            {/* Re-search */}
            <button
              onClick={handleSearch}
              className="w-full mt-5 py-3 rounded-xl border-2 border-green-400 text-green-600 font-medium text-sm hover:bg-green-50 transition-colors"
            >
              🔄　別の3件を見る
            </button>
          </div>
        )}

        <p className="text-center text-xs text-gray-300 mt-10">
          ※ 移動時間は目安です
        </p>
      </div>
    </main>
  );
}
