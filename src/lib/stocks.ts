let seed = 1;

export function getStock(id: string) {
  return stocks.find((s) => s.name === id);
}

export const stocks = [
  {
    name: "AAPL",
    price: 149,
    change: 3.21,
    shares: 3,
    points: trendUp(130, 149, 32),
  },
  {
    name: "MSFT",
    price: 131,
    change: 1.0,
    shares: 8,
    points: trendFlat(130, 150, 32),
  },
  {
    name: "META",
    price: 131,
    change: 3.5,
    shares: 12,
    points: trendUp(130, 150, 32),
  },
] as const;

const stories = {
  AAPL: [
    {
      title: "Apple Announces Record-Breaking iPhone Sales",
      description:
        "Cupertino, CA — Apple Inc. (AAPL) reported today that it has shattered all previous records with its latest iPhone sales figures. The tech giant sold over 50 million iPhones in the first week of its latest model's release, driving AAPL stock prices to new highs.",
    },
    {
      title: "Apple Unveils Revolutionary AI-Driven Product Line",
      description:
        "San Francisco, CA — Apple Inc. (AAPL) wowed investors and tech enthusiasts alike with the unveiling of its groundbreaking AI-driven product line. The new devices, powered by Apple's cutting-edge artificial intelligence, promise to reshape the future of consumer technology, causing a surge in AAPL stock prices.",
    },
    {
      title: "AAPL Stock Suffers Temporary Dip Amidst Supply Chain Disruption",
      description:
        "Cupertino, CA — Apple Inc. (AAPL) faced a minor setback as supply chain disruptions temporarily affected the production of its flagship products. While analysts believe this to be a short-term issue, it caused a brief dip in AAPL stock prices, creating buying opportunities for savvy investors.",
    },
  ],
  MSFT: [
    {
      title: "Microsoft Reports Strong Q3 Earnings, Beats Expectations",
      description:
        "Redmond, WA — Microsoft Corporation (MSFT) announced its Q3 earnings today, surpassing market expectations. The tech giant reported robust revenue growth across its cloud computing, software, and hardware divisions, leading to a surge in MSFT stock prices.",
    },
    {
      title: "Microsoft Unveils Revolutionary Augmented Reality Headset",
      description:
        "Seattle, WA — Microsoft Corporation (MSFT) unveiled its groundbreaking augmented reality headset, promising to revolutionize the way people work and play. The innovative device generated significant buzz among investors and consumers, propelling MSFT stock prices to new heights.",
    },
  ],
  META: [
    {
      title:
        "META Platforms Announces Strong Quarter with Robust Advertising Revenue",
      description:
        "Menlo Park, CA — META Platforms, Inc. (META) reported a strong quarter, driven by its advertising business. The company's innovative ad targeting and engagement strategies resulted in record-breaking advertising revenue, sending META stock prices soaring.",
    },
    {
      title: "META Unveils Ambitious Metaverse Expansion Plans",
      description:
        "Palo Alto, CA — META Platforms, Inc. (META) unveiled ambitious plans for its metaverse expansion. The company announced strategic partnerships, acquisitions, and content creation initiatives aimed at establishing itself as the leader in the metaverse space. Investors responded positively, pushing META stock to new highs.",
    },
    {
      title: "META Faces Regulatory Challenges as Privacy Concerns Mount",
      description:
        "San Francisco, CA — META Platforms, Inc. (META) encountered regulatory hurdles as concerns over user privacy and data security grew. Government agencies initiated investigations into the company's practices, causing fluctuations in META stock prices and uncertainty among investors.",
    },
  ],
} as const;

export async function getStories(stock: Stock) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return stories[stock.name];
}

export type Stock = (typeof stocks)[number];

function trendUp(min: number, max: number, length: number) {
  let a = 1;
  let b = 100;
  let c = 7;
  let d = 10;

  let upwards = Array.from(Array(length - 2)).map((_, i) => {
    let n = a * i * i + random((-b * i) / c, (b * i) / d);
    return n;
  });

  let trend = scaleBetween(upwards, min, max);

  return [min, ...trend, max];
}

function trendFlat(min: number, max: number, length: number) {
  let flat = Array.from(Array(length - 2)).map((_, i) => {
    let n = random(min, max);
    return n;
  });

  let trend = scaleBetween(flat, min, max);

  return [min, ...trend, max];
}

function scaleBetween(list: number[], scaledMin: number, scaledMax: number) {
  var max = Math.max(...list);
  var min = Math.min(...list);
  return list.map(
    (num) => ((scaledMax - scaledMin) * (num - min)) / (max - min) + scaledMin,
  );
}

function random(min: number, max: number) {
  let x = Math.sin(seed++) * 10000;
  let r = x - Math.floor(x);

  return r * (max - min) + min;
}
