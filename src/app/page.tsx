"use client";

import { useState } from "react";
import { spots, filterByRainy, filterByTime, pickRandom, type Spot } from "./data";

type TimeLimit = 30 | 60 | null;

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
        滞在 {spot.time}
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
  const [rainy, setRainy] = useState(false);
  const [timeLimit, setTimeLimit] = useState<TimeLimit>(null);
  const [results, setResults] = useState<Spot[] | null>(null);

  const buildPool = (rainyOverride?: boolean) => {
    let pool = rainyOverride ?? rainy ? filterByRainy(spots) : spots;
    if (timeLimit !== null) pool = filterByTime(pool, timeLimit);
    return pool;
  };

  const handleQuickSearch = () => {
    setRainy(false);
    setTimeLimit(null);
    setResults(pickRandom(spots, 3));
  };

  const handleSearch = () => {
    setResults(pickRandom(buildPool(), 3));
  };

  const handleReset = () => {
    setRainy(false);
    setTimeLimit(null);
    setResults(null);
  };

  const timeLimits: { label: string; value: TimeLimit }[] = [
    { label: "30分以内", value: 30 },
    { label: "60分以内", value: 60 },
    { label: "制限なし", value: null },
  ];

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

        {/* ① 今日のおすすめ */}
        <button
          onClick={handleQuickSearch}
          className="w-full py-4 rounded-xl bg-amber-400 text-white font-bold text-base shadow-sm active:scale-95 transition-transform hover:bg-amber-500 mb-6"
        >
          ⚡ 今日のおすすめ
        </button>

        {/* divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">条件で絞って探す</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* ② 雨の日モード toggle */}
        <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3 mb-4 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-base">🌧️</span>
            <span className="text-sm font-medium text-gray-700">雨の日モード</span>
            <span className="text-xs text-gray-400">（屋内 · 雨OKのみ）</span>
          </div>
          <button
            onClick={() => { setRainy(!rainy); setResults(null); }}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              rainy ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                rainy ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        {/* ③ 時間フィルター */}
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          滞在時間のめやす
        </p>
        <div className="flex gap-2 mb-6">
          {timeLimits.map(({ label, value }) => (
            <button
              key={String(value)}
              onClick={() => { setTimeLimit(value); setResults(null); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                timeLimit === value
                  ? "border-green-500 bg-green-500 text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-green-300"
              }`}
            >
              {label}
            </button>
          ))}
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
                {results.length > 0 ? "おすすめ 3 件" : "条件に合うスポットがありません"}
              </p>
              <button
                onClick={handleReset}
                className="text-xs text-gray-400 underline underline-offset-2"
              >
                リセット
              </button>
            </div>

            {results.length > 0 && (
              <>
                <div className="space-y-4">
                  {results.map((spot, i) => (
                    <SpotCard key={spot.name} spot={spot} rank={i + 1} />
                  ))}
                </div>

                <button
                  onClick={handleSearch}
                  className="w-full mt-5 py-3 rounded-xl border-2 border-green-400 text-green-600 font-medium text-sm hover:bg-green-50 transition-colors"
                >
                  🔄　別の3件を見る
                </button>
              </>
            )}
          </div>
        )}

        <p className="text-center text-xs text-gray-300 mt-10">
          ※ 滞在時間は目安です
        </p>
      </div>
    </main>
  );
}
