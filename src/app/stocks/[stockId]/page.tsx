import Spinner from "@/components/spinner";
import StockCard from "@/components/stock-card";
import { getStock, getStories } from "@/lib/stocks";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default function Page({ params }: { params: { stockId: string } }) {
  let stock = getStock(params.stockId);

  if (!stock) {
    notFound();
  }

  return (
    <div>
      <div>
        <Link
          href="/"
          className="text-xs font-semibold text-gray-500 inline-flex hover:text-gray-200 items-center"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          Back
        </Link>
      </div>

      <div className="mt-4">
        <StockCard stock={stock} />
      </div>

      <div className="mt-10">
        <p className="text-sm text-gray-400 font-medium">Related News</p>

        <Suspense fallback={<Loading />}>
          <Await promise={getStories(stock)}>
            {(stories) => (
              <ul className="-mt-1 divide-y divide-gray-700">
                {stories.map((story) => (
                  <li key={story.title} className="flex flex-col py-3">
                    <p className="text-sm font-medium text-white truncate">
                      {story.title}
                    </p>
                    <p className="mt-2 text-xs text-gray-400 line-clamp-1 md:line-clamp-2">
                      {story.description}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex justify-center mt-6">
      <Spinner />
    </div>
  );
}

// async function getStories(stock: Stock) {
//   await new Promise((resolve) => setTimeout(resolve, 2000));

//   return 123;
// }

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
