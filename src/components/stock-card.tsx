import { Stock } from "@/lib/stocks";
import { SVGProps } from "react";

export default function StockCard({
  stock,
  border = false,
}: {
  stock: Stock;
  border?: boolean;
}) {
  return (
    <div
      className={`${
        border
          ? "bg-gray-700/75 px-3 py-5 rounded-lg border border-white/5"
          : ""
      } w-full flex items-center justify-between`}
    >
      <div className="w-[25%]">
        <p className="uppercase font-bold tracking-wide">{stock.name}</p>
        <p className="hidden md:block text-sm text-gray-400">
          {stock.shares} shares
        </p>
      </div>
      <div className="w-[43%]">
        <div className="border-b border-white/10 border-dashed w-full pb-1">
          <Sparkline
            plot={stock.points}
            className="h-4 md:h-8 stroke-white/90"
          />
        </div>
      </div>
      <div className="w-[30%] flex items-center justify-end">
        <span className=" bg-gray-50 text-gray-900 font-medium py-1.5 px-3 rounded text-xs md:text-sm">
          +{stock.change.toFixed(2)}%
        </span>
      </div>
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
