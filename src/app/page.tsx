import { SVGProps, Suspense } from "react";
import { RefreshButton } from "./refresh-button";

async function getStocks() {
  // simulate a data fetch
  const data = await new Promise<typeof stocks>((resolve) => {
    setTimeout(() => resolve(stocks), 1500);
  });

  return data;
}

export default async function Home() {
  const promise = getStocks();

  return (
    <div className="p-6 md:p-8 flex flex-col h-full max-w-md mx-auto">
      <h1 className="tracking-tighter font-bold text-5xl">Stocks</h1>

      <div className="grow mt-10 md:mt-12">
        <Suspense fallback={<Loading />} key={new Date().toString()}>
          <Await promise={promise}>
            {(stocks) => (
              <div className="space-y-5 md:space-y-8 md:[&>*:nth-child(n+3)]:hidden lg:[&>*:nth-child(n+3)]:flex">
                {stocks.map((stock, i) => (
                  <div
                    key={stock.name}
                    className={`flex w-full items-center border-b border-white/10 pb-5 md:pb-8`}
                  >
                    <div className="w-[25%]">
                      <p className="uppercase font-bold tracking-wide">
                        {stock.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {stock.shares} shares
                      </p>
                    </div>
                    <div className="w-[43%]">
                      <div className="border-b border-white/10 border-dashed w-full pb-1">
                        <Sparkline
                          plot={stock.points}
                          className="w-24 h-8 stroke-white/90"
                        />
                      </div>
                    </div>
                    <div className="w-[30%] flex items-center justify-end">
                      <span className=" bg-gray-50 text-gray-900 py-1.5 px-3 rounded text-sm">
                        +{stock.change.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Await>
        </Suspense>
      </div>

      <div className="mt-16">
        <RefreshButton />
      </div>
    </div>
  );
}

async function Await<T>({
  promise,
  children,
}: {
  promise: Promise<T>;
  children: (result: T) => JSX.Element;
}) {
  let result = await promise;

  return children(result);
}

const stocks = [
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

function Loading() {
  return (
    <div className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 27 27"
        className="h-8 w-8 animate-spin"
        style={{ animationTimingFunction: "steps(12, end)" }}
      >
        <path
          style={{ opacity: 12 / 12 }}
          d="M18.696 10.5a1.002 1.002 0 01.365-1.367l4.759-2.751a1.007 1.007 0 011.37.368.995.995 0 01-.364 1.364l-4.764 2.751a1 1 0 01-1.366-.365z"
          fill="currentColor"
        />
        <path
          style={{ opacity: 11 / 12 }}
          fill="currentColor"
          d="M16.133 6.938l2.75-4.765a1 1 0 011.732 1l-2.748 4.762a1 1 0 11-1.734-.997z"
        />
        <path
          style={{ opacity: 10 / 12 }}
          fill="currentColor"
          d="M13.499 7.5a1 1 0 01-1-1.001V1a1.001 1.001 0 012.003 0v5.499A1.002 1.002 0 0113.499 7.5z"
        />
        <path
          style={{ opacity: 9 / 12 }}
          fill="currentColor"
          d="M8.303 10.5a1 1 0 01-1.365.365L2.175 8.114a.997.997 0 01-.367-1.364c.277-.479.89-.642 1.367-.368l4.762 2.751a1 1 0 01.366 1.367z"
        />
        <path
          style={{ opacity: 8 / 12 }}
          fill="currentColor"
          d="M9.133 7.937l-2.75-4.763a.999.999 0 111.732-1l2.75 4.765a1 1 0 01-1.732.998z"
        />
        <path
          style={{ opacity: 7 / 12 }}
          fill="currentColor"
          d="M6.499 14.5H1a1 1 0 110-2.001h5.499a1.001 1.001 0 010 2.001z"
        />
        <path
          style={{ opacity: 6 / 12 }}
          fill="currentColor"
          d="M8.303 16.502a1 1 0 01-.365 1.366l-4.762 2.749a1.006 1.006 0 01-1.368-.366 1.003 1.003 0 01.367-1.368l4.762-2.748a.996.996 0 011.366.367z"
        />
        <path
          style={{ opacity: 5 / 12 }}
          fill="currentColor"
          d="M10.866 20.062l-2.75 4.767c-.277.475-.89.639-1.367.362a.999.999 0 01-.365-1.365l2.75-4.764a1 1 0 011.732 1z"
        />
        <path
          style={{ opacity: 4 / 12 }}
          fill="currentColor"
          d="M13.499 19.502c.554 0 1.003.448 1.003 1.002v5.498a1.001 1.001 0 01-2.003 0v-5.498a1 1 0 011-1.002z"
        />
        <path
          style={{ opacity: 3 / 12 }}
          fill="currentColor"
          d="M17.867 19.062l2.748 4.764a1 1 0 01-1.732 1.003l-2.75-4.767a1 1 0 011.734-1z"
        />
        <path
          style={{ opacity: 2 / 12 }}
          fill="currentColor"
          d="M18.696 16.502a.995.995 0 011.365-.367l4.765 2.748a1.002 1.002 0 01-1.006 1.734l-4.759-2.749a1.002 1.002 0 01-.365-1.366z"
        />
        <path
          style={{ opacity: 1 / 12 }}
          fill="currentColor"
          d="M25.998 12.499h-5.501a1.001 1.001 0 000 2.001h5.501a1 1 0 100-2.001z"
        />
      </svg>
    </div>
  );
}

function Sparkline({
  plot,
  ...rest
}: {
  plot: number[];
} & SVGProps<SVGSVGElement>) {
  let invertPlot = plot.map((point) => Math.max(...plot) - point);
  let along = Array.from(Array(plot.length)).map((_, i) => i);
  let xs = scaleBetween(along, 0, 3);
  let ys = scaleBetween(invertPlot, 0, 1);

  let d = along.map((index) => `${xs[index]} ${ys[index]}`).join(" L ");

  return (
    <svg viewBox="0 0 3 1" {...rest}>
      <path
        d={`M ${d}`}
        strokeWidth="1"
        fill="transparent"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function scaleBetween(list: number[], scaledMin: number, scaledMax: number) {
  var max = Math.max(...list);
  var min = Math.min(...list);
  return list.map(
    (num) => ((scaledMax - scaledMin) * (num - min)) / (max - min) + scaledMin,
  );
}

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

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

export const runtime = "edge";
