import StockCard from "@/components/stock-card";
import { getStock } from "@/lib/stocks";
import { notFound } from "next/navigation";

export default function Page({ params }: { params: { stockId: string } }) {
  let stock = getStock(params.stockId);

  if (!stock) {
    notFound();
  }

  return <StockCard stock={stock} />;
}
