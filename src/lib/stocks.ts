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
];

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
