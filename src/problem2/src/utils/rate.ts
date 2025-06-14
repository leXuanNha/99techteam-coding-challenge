import type { TokenPrice } from "@/@types/price";

export function getExchangeRate(
  fromSymbol: string,
  toSymbol: string,
  rates: TokenPrice[]
): number {
  // Find the latest prices for both currencies
  const fromPrices = rates.filter(
    (item) => item.currency.toLowerCase() === fromSymbol.toLowerCase()
  );
  const toPrices = rates.filter(
    (item) => item.currency.toLowerCase() === toSymbol.toLowerCase()
  );

  if (fromPrices.length === 0 || toPrices.length === 0) {
    // Fallback to default rate if currencies not found
    return 0;
  }

  // Get the most recent price for each currency
  const fromPrice = fromPrices.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];
  const toPrice = toPrices.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  // Calculate exchange rate (from currency to to currency)
  const rate = fromPrice.price / toPrice.price;
  return rate;
}

export function formatExchangeRate(rate: number): string {
  if (rate >= 1) {
    return rate.toLocaleString(undefined, { maximumFractionDigits: 2 });
  } else {
    return rate.toFixed(6);
  }
}
