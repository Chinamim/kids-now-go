export type Spot = {
  name: string;
  time: string;
  tags: string[];
  note: string;
  nearestStation: string;
  distance: string;
};

export const spots: Spot[] = [
  {
    name: "東京おもちゃ美術館",
    time: "30〜45分",
    tags: ["屋内", "雨OK", "幼児OK"],
    note: "木のおもちゃ中心で雨の日鉄板",
    nearestStation: "四ツ谷駅",
    distance: "徒歩7分",
  },
  {
    name: "アソボーノ！東京ドームシティ",
    time: "20〜30分",
    tags: ["屋内", "雨OK", "0歳OK"],
    note: "超定番の室内遊び場",
    nearestStation: "水道橋駅",
    distance: "徒歩5分",
  },
  {
    name: "キドキド よみうりランド店",
    time: "40〜60分",
    tags: ["屋内", "体を動かす", "雨OK"],
    note: "体力消費系",
    nearestStation: "読売ランド前駅",
    distance: "徒歩5分",
  },
  {
    name: "すみだ水族館",
    time: "30〜40分",
    tags: ["屋内", "雨OK"],
    note: "小さめで回りやすい",
    nearestStation: "押上駅",
    distance: "徒歩5分",
  },
  {
    name: "葛西臨海水族園",
    time: "40〜60分",
    tags: ["屋内", "屋外", "コスパ良い"],
    note: "広すぎずちょうどいい",
    nearestStation: "葛西臨海公園駅",
    distance: "徒歩5分",
  },
  {
    name: "上野動物園",
    time: "60〜90分",
    tags: ["屋外", "人気", "定番"],
    note: "半日コース",
    nearestStation: "上野駅",
    distance: "徒歩5分",
  },
  {
    name: "井の頭自然文化園",
    time: "40〜60分",
    tags: ["屋外", "動物", "コンパクト"],
    note: "ちょうどいい規模",
    nearestStation: "井の頭公園駅",
    distance: "徒歩3分",
  },
  {
    name: "豊洲チームラボプラネッツ",
    time: "60分",
    tags: ["屋内", "体験型", "雨OK"],
    note: "少し大きい子向け",
    nearestStation: "新豊洲駅",
    distance: "徒歩3分",
  },
  {
    name: "レゴランド・ディスカバリー東京",
    time: "60分",
    tags: ["屋内", "雨OK", "遊具"],
    note: "小学生前後に人気",
    nearestStation: "台場駅",
    distance: "徒歩5分",
  },
  {
    name: "池袋サンシャイン水族館",
    time: "40〜60分",
    tags: ["屋内", "雨OK"],
    note: "アクセス良い",
    nearestStation: "東池袋駅",
    distance: "徒歩5分",
  },
  {
    name: "東武動物公園",
    time: "半日〜1日",
    tags: ["屋外", "遊園地", "動物"],
    note: "しっかり遊ぶ系",
    nearestStation: "東武動物公園駅",
    distance: "徒歩3分",
  },
  {
    name: "多摩動物公園",
    time: "90分〜",
    tags: ["屋外", "広い", "自然"],
    note: "体力いるが満足度高い",
    nearestStation: "多摩動物公園駅",
    distance: "徒歩1分",
  },
  {
    name: "しながわ水族館",
    time: "40分",
    tags: ["屋内", "コンパクト", "雨OK"],
    note: "短時間向け",
    nearestStation: "大森海岸駅",
    distance: "徒歩10分",
  },
  {
    name: "日本科学未来館",
    time: "60分",
    tags: ["屋内", "学び", "雨OK"],
    note: "知育系",
    nearestStation: "テレコムセンター駅",
    distance: "徒歩4分",
  },
  {
    name: "イオンモール幕張新都心",
    time: "30〜90分",
    tags: ["屋内", "買い物", "キッズスペース"],
    note: "とりあえず行ける",
    nearestStation: "海浜幕張駅",
    distance: "徒歩15分",
  },
  {
    name: "アリオ亀有",
    time: "30〜60分",
    tags: ["屋内", "無料", "キッズ"],
    note: "ワーママ鉄板",
    nearestStation: "亀有駅",
    distance: "徒歩5分",
  },
  {
    name: "ボーネルンド あそびのせかい（有明）",
    time: "30〜60分",
    tags: ["屋内", "幼児", "雨OK"],
    note: "安全系遊び場",
    nearestStation: "国際展示場駅",
    distance: "徒歩5分",
  },
  {
    name: "国営昭和記念公園",
    time: "60〜120分",
    tags: ["屋外", "広い", "自然"],
    note: "体力余ってる日用",
    nearestStation: "西立川駅",
    distance: "徒歩2分",
  },
  {
    name: "お台場海浜公園",
    time: "30〜60分",
    tags: ["屋外", "無料", "散歩"],
    note: "とりあえず外出したい時",
    nearestStation: "お台場海浜公園駅",
    distance: "徒歩3分",
  },
];

/** タグに「雨OK」「屋内」を含むスポットは雨の日でも可 */
export function filterByRainy(arr: Spot[]): Spot[] {
  return arr.filter(
    (s) => s.tags.includes("雨OK") || s.tags.includes("屋内")
  );
}

/** time 文字列の最小分数を返す（"半日" / "日" は 999 扱い） */
function parseMinMinutes(time: string): number {
  if (time.includes("半日") || time.includes("日")) return 999;
  const match = time.match(/\d+/);
  return match ? parseInt(match[0]) : 999;
}

/** 滞在時間の最小値が maxMinutes 以下のスポットに絞る */
export function filterByTime(arr: Spot[], maxMinutes: number): Spot[] {
  return arr.filter((s) => parseMinMinutes(s.time) <= maxMinutes);
}

/** 配列をシャッフルして先頭 n 件を返す */
export function pickRandom(arr: Spot[], n: number): Spot[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}
