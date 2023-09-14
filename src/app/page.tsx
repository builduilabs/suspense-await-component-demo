import { SVGProps, Suspense } from "react";
import { RefreshButton } from "./refresh-button";
import Link from "next/link";
import { stocks } from "@/lib/stocks";
import StockCard from "@/components/stock-card";

// async function getStocks() {
//   // simulate a data fetch
//   const data = await new Promise<typeof stocks>((resolve) => {
//     setTimeout(() => resolve(stocks), 1500);
//   });

//   return data;
// }

// {/* <Suspense fallback={<Loading />} key={new Date().toString()}>
//   <Await promise={promise}>
//     {(stocks) => ( */}

export default async function Home() {
  return (
    <div>
      <div className="mt-4">
        <Link href="/" className="tracking-tighter font-bold text-4xl">
          Stocks
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {stocks.map((stock) => (
          <Link
            href={`/stocks/${stock.name}`}
            key={stock.name}
            className="block hover:bg-gray-700/50 rounded-lg"
          >
            <StockCard border stock={stock} />
          </Link>
        ))}
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

export const runtime = "edge";

function scaleBetween(list: number[], scaledMin: number, scaledMax: number) {
  var max = Math.max(...list);
  var min = Math.min(...list);
  return list.map(
    (num) => ((scaledMax - scaledMin) * (num - min)) / (max - min) + scaledMin,
  );
}
