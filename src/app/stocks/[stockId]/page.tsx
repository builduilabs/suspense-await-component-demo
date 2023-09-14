import Spinner from "@/components/spinner";
import StockCard from "@/components/stock-card";
import { Stock, getStock, getStories } from "@/lib/stocks";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default function Page({ params }: { params: { stockId: string } }) {
  let stock = getStock(params.stockId);

  if (!stock) {
    notFound();
  }

  console.log("rendering");
  return (
    <div>
      <StockCard stock={stock} />

      <div className="mt-8">
        <p className="text-sm text-gray-400 font-medium">Related News</p>

        <Suspense fallback={<Loading />}>
          <Await promise={getStories(stock)}>
            {(stories) => (
              <ul className=" mt-2 space-y-3">
                {stories.map((story) => (
                  <li
                    key={story.title}
                    className="flex flex-col bg-gray-700/75 rounded p-3"
                  >
                    <p className="font-medium text-white truncate">
                      {story.title}
                    </p>
                    <p className="mt-2 text-sm text-gray-300 line-clamp-2">
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
