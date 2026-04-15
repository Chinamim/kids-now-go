"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Weather = "sunny" | "rainy";
type AgeGroup = "0-2" | "3-6" | "7+";

interface Spot {
  id: number;
  name: string;
  area: string;
  weather: Weather[];
  ageGroups: AgeGroup[];
  openStart: number; // 24h hour, -1 = always open
  openEnd: number;
  travelMin: number;
  tags: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SPOTS: Spot[] = [
  {
    id: 1,
    name: "上野動物園",
    area: "上野",
    weather: ["sunny"],
    ageGroups: ["0-2", "3-6", "7+"],
    openStart: 9, openEnd: 16,
    travelMin: 30,
    tags: ["屋外", "動物", "広い"],
  },
  {
    id: 2,
    name: "国立科学博物館",
    area: "上野",
    weather: ["rainy"],
    ageGroups: ["3-6", "7+"],
    openStart: 9, openEnd: 17,
    travelMin: 30,
    tags: ["屋内", "知育", "雨でもOK"],
  },
  {
    id: 3,
    name: "葛西臨海水族園",
    area: "葛西",
    weather: ["sunny", "rainy"],
    ageGroups: ["0-2", "3-6", "7+"],
    openStart: 9, openEnd: 17,
    travelMin: 45,
    tags: ["屋内", "雨でもOK", "ベビーカーOK"],
  },
  {
    id: 4,
    name: "代々木公園",
    area: "原宿",
    weather: ["sunny"],
    ageGroups: ["0-2", "3-6", "7+"],
    openStart: -1, openEnd: -1,
    travelMin: 20,
    tags: ["屋外", "広い", "無料", "ベビーカーOK"],
  },
  {
    id: 5,
    name: "キッザニア東京",
    area: "豊洲",
    weather: ["sunny", "rainy"],
    ageGroups: ["3-6", "7+"],
    openStart: 9, openEnd: 15,
    travelMin: 40,
    tags: ["屋内", "体験型", "要予約"],
  },
  {
    id: 6,
    name: "アンパンマンこどもミュージアム",
    area: "横浜",
    weather: ["sunny", "rainy"],
    ageGroups: ["0-2", "3-6"],
    openStart: 10, openEnd: 18,
    travelMin: 35,
    tags: ["屋内", "赤ちゃんOK", "ベビーカーOK"],
  },
  {
    id: 7,
    name: "東京タワー",
    area: "芝公園",
    weather: ["sunny", "rainy"],
    ageGroups: ["3-6", "7+"],
    openStart: 9, openEnd: 23,
    travelMin: 25,
    tags: ["屋内", "眺望", "雨でもOK"],
  },
  {
    id: 8,
    name: "光が丘公園",
    area: "練馬",
    weather: ["sunny"],
    ageGroups: ["0-2", "3-6", "7+"],
    openStart: -1, openEnd: -1,
    travelMin: 40,
    tags: ["屋外", "広い", "無料", "ベビーカーOK"],
  },
  {
    id: 9,
    name: "夢の島熱帯植物館",
    area: "夢の島",
    weather: ["rainy"],
    ageGroups: ["3-6", "7+"],
    openStart: 9, openEnd: 16,
    travelMin: 45,
    tags: ["屋内", "植物", "空いてる"],
  },
  {
    id: 10,
    name: "イオンレイクタウン キッズランド",
    area: "越谷",
    weather: ["rainy"],
    ageGroups: ["0-2", "3-6"],
    openStart: 10, openEnd: 20,
    travelMin: 50,
    tags: ["屋内", "無料", "ベビーカーOK", "空いてる"],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isOpenNow(spot: Spot): boolean {
  if (spot.openStart === -1) return true;
  const h = new Date().getHours();
  return h >= spot.openStart && h < spot.openEnd;
}

function getResults(weather: Weather, age: AgeGroup): Spot[] {
  const matched = SPOTS.filter(
    (s) => s.weather.includes(weather) && s.ageGroups.includes(age)
  );
  // Open spots first
  const open = matched.filter(isOpenNow);
  const closed = matched.filter((s) => !isOpenNow(s));
  return [...open, ...closed].slice(0, 3);
}

function openLabel(spot: Spot): string {
  if (spot.openStart === -1) return "いつでもOK";
  return `${spot.openStart}:00–${spot.openEnd}:00`;
}

// ─── Components ───────────────────────────────────────────────────────────────

const WEATHER_OPTIONS: { value: Weather; label: string; emoji: string }[] = [
  { value: "sunny", label: "晴れ", emoji: "☀️" },
  { value: "rainy", label: "雨",   emoji: "🌧️" },
];

const AGE_OPTIONS: { value: AgeGroup; label: string }[] = [
  { value: "0-2", label: "0〜2歳" },
  { value: "3-6", label: "3〜6歳" },
  { value: "7+",  label: "7歳以上" },
];

function SpotCard({ spot }: { spot: Spot }) {
  const open = isOpenNow(spot);
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-100">
      {/* Name + open badge */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-bold text-base leading-snug">{spot.name}</h3>
        <span
          className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
            open
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          {open ? "営業中" : "時間外"}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {spot.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-green-50 text-green-700 px-2.5 py-0.5 rounded-full border border-green-200"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
          </svg>
          約{spot.travelMin}分
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {spot.area}
        </span>
        <span className="flex items-center gap-1 ml-auto text-xs">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {openLabel(spot)}
        </span>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [age, setAge] = useState<AgeGroup | null>(null);
  const [results, setResults] = useState<Spot[] | null>(null);

  const canSearch = weather !== null && age !== null;

  const handleSearch = () => {
    if (!weather || !age) return;
    setResults(getResults(weather, age));
  };

  const handleReset = () => {
    setWeather(null);
    setAge(null);
    setResults(null);
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-md mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8">
          <p className="text-2xl mb-1">🗺️</p>
          <h1 className="text-xl font-bold leading-snug text-gray-900">
            子供と今すぐ行けるスポット
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            条件を選んで3秒でお出かけ先を決める
          </p>
        </div>

        {/* Selectors */}
        <div className="space-y-5 mb-6">
          {/* Weather */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">今日の天気</p>
            <div className="flex gap-3">
              {WEATHER_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setWeather(opt.value); setResults(null); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-medium text-sm transition-all ${
                    weather === opt.value
                      ? "border-green-500 bg-green-500 text-white shadow-sm"
                      : "border-gray-200 bg-white text-gray-600 hover:border-green-300"
                  }`}
                >
                  <span className="text-lg">{opt.emoji}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Age */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">子供の年齢</p>
            <div className="flex gap-2">
              {AGE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setAge(opt.value); setResults(null); }}
                  className={`flex-1 py-3 rounded-xl border-2 font-medium text-sm transition-all ${
                    age === opt.value
                      ? "border-green-500 bg-green-500 text-white shadow-sm"
                      : "border-gray-200 bg-white text-gray-600 hover:border-green-300"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          disabled={!canSearch}
          className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
            canSearch
              ? "bg-green-500 text-white shadow-md hover:bg-green-600 active:scale-95"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          🔍　探す
        </button>

        {/* Results */}
        {results !== null && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-gray-800">
                {results.length > 0
                  ? `おすすめ ${results.length} 件`
                  : "条件に合うスポットが見つかりませんでした"}
              </p>
              <button
                onClick={handleReset}
                className="text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2"
              >
                条件をリセット
              </button>
            </div>

            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((spot) => (
                  <SpotCard key={spot.id} spot={spot} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 text-center text-gray-400 text-sm border border-gray-100">
                条件を変えてもう一度試してみてください
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-gray-300 mt-12">
          ※ 移動時間・営業時間は目安です
        </p>
      </div>
    </main>
  );
}
