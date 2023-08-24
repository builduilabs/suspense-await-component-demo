"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export function RefreshButton() {
  let router = useRouter();

  function handleRefresh() {
    router.refresh();
  }

  return (
    <button
      onClick={handleRefresh}
      className="bg-gray-700 inline-flex items-center space-x-1.5 font-medium text-sm py-1.5 px-3 rounded"
    >
      <ArrowPathIcon className="h-4 w-4" />
      <span>Refresh</span>
    </button>
  );
}
