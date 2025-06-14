import type { TokenPrice } from "@/@types/price";

export async function fetchExchangeRates(): Promise<TokenPrice[]> {
  try {
    const response = await fetch("https://interview.switcheo.com/prices.json");
    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }
    const data: TokenPrice[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error;
  }
}
