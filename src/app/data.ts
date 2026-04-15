export type Spot = {
  name: string;
  time: string;
  tags: string[];
  note: string;
};

export const spots: Spot[] = [
  {
    name: "東京おもちゃ美術館",
    time: "30〜45分",
    tags: ["屋内", "雨OK", "幼児OK"],
    note: "木のおもちゃ中心で雨の日鉄板"
  },
  {
    name: "アソボーノ！東京ドームシティ",
    time: "20〜30分",
    tags: ["屋内", "雨OK", "0歳OK"],
    note: "超定番の室内遊び場"
  },
  {
    name: "キドキド よみうりランド店",
    time: "40〜60分",
    tags: ["屋内", "体を動かす", "雨OK"],
    note: "体力消費系"
  },
  {
    name: "すみだ水族館",
    time: "30〜40分",
    tags: ["屋内", "雨OK"],
    note: "小さめで回りやすい"
  },
  {
    name: "葛西臨海水族園",
    time: "40〜60分",
    tags: ["屋内", "屋外", "コスパ良い"],
    note: "広すぎずちょうどいい"
  },
  {
    name: "上野動物園",
    time: "60〜90分",
    tags: ["屋外", "人気", "定番"],
    note: "半日コース"
  },
  {
    name: "井の頭自然文化園",
    time: "40〜60分",
    tags: ["屋外", "動物", "コンパクト"],
    note: "ちょうどいい規模"
  },
  {
    name: "豊洲チームラボプラネッツ",
    time: "60分",
    tags: ["屋内", "体験型", "雨OK"],
    note: "少し大きい子向け"
  },
  {
    name: "レゴランド・ディスカバリー東京",
    time: "60分",
    tags: ["屋内", "雨OK", "遊具"],
    note: "小学生前後に人気"
  },
  {
    name: "池袋サンシャイン水族館",
    time: "40〜60分",
    tags: ["屋内", "雨OK"],
    note: "アクセス良い"
  },
  {
    name: "東武動物公園",
    time: "半日〜1日",
    tags: ["屋外", "遊園地", "動物"],
    note: "しっかり遊ぶ系"
  },
  {
    name: "多摩動物公園",
    time: "90分〜",
    tags: ["屋外", "広い", "自然"],
    note: "体力いるが満足度高い"
  },
  {
    name: "しながわ水族館",
    time: "40分",
    tags: ["屋内", "コンパクト", "雨OK"],
    note: "短時間向け"
  },
  {
    name: "日本科学未来館",
    time: "60分",
    tags: ["屋内", "学び", "雨OK"],
    note: "知育系"
  },
  {
    name: "イオンモール幕張新都心",
    time: "30〜90分",
    tags: ["屋内", "買い物", "キッズスペース"],
    note: "とりあえず行ける"
  },
  {
    name: "アリオ亀有",
    time: "30〜60分",
    tags: ["屋内", "無料", "キッズ"],
    note: "ワーママ鉄板"
  },
  {
    name: "ボーネルンド あそびのせかい（有明）",
    time: "30〜60分",
    tags: ["屋内", "幼児", "雨OK"],
    note: "安全系遊び場"
  },
  {
    name: "国営昭和記念公園",
    time: "60〜120分",
    tags: ["屋外", "広い", "自然"],
    note: "体力余ってる日用"
  },
  {
    name: "お台場海浜公園",
    time: "30〜60分",
    tags: ["屋外", "無料", "散歩"],
    note: "とりあえず外出したい時"
  }
];

/** タグに「雨OK」「屋内」を含むスポットは雨の日でも可 */
export function filterByWeather(weather: "sunny" | "rainy"): Spot[] {
  if (weather === "sunny") return spots;
  return spots.filter(
    (s) => s.tags.includes("雨OK") || s.tags.includes("屋内")
  );
}

/** 配列をシャッフルして先頭 n 件を返す */
export function pickRandom(arr: Spot[], n: number): Spot[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}
