import { formatExchangeRate } from "@/utils/rate";

type ExchangeRateProps = {
  isLoading?: boolean;
  fromSymbol: string;
  toSymbol: string;
  rate?: number;
};

export default function ExchangeRate({
  isLoading,
  fromSymbol,
  toSymbol,
  rate = 1800,
}: ExchangeRateProps) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-muted px-4 py-3 text-xs">
      <span>Exchange Rate</span>
      <span>
        {isLoading
          ? "Loading..."
          : `1 ${fromSymbol} ≈ ${formatExchangeRate(rate)} ${toSymbol}`}
      </span>
    </div>
  );
}
