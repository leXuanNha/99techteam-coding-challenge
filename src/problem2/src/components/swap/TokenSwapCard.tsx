import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useTokenSwap } from "@/hooks/useTokenSwap";
import TokenInput from "./TokenInput";
import SwapDirectionButton from "./SwapDirectionButton";
import ExchangeRate from "./ExchangeRate";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";

export default function TokenSwapCard() {
  const {
    isSubmitting,
    isLoadingRates,
    isFormReady,
    fromToken,
    toToken,
    currentExchangeRate,
    form,
    setFromToken,
    setToToken,
    handleSwapDirection,
    handleFromAmountChange,
    handleToAmountChange,
    onSubmit,
  } = useTokenSwap();

  const submitBtnText = useMemo(() => {
    if (isSubmitting) return "Swapping";
    if (isLoadingRates) return "Loading rates...";
    return "Swap";
  }, [isSubmitting, isLoadingRates]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Swap Tokens</CardTitle>
        <CardDescription>Exchange tokens at the best rates</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <TokenInput
              showMaxButton
              name="fromAmount"
              label="From"
              control={form.control}
              token={fromToken}
              onTokenSelect={setFromToken}
              onAmountChange={handleFromAmountChange}
              onMaxClick={() =>
                handleFromAmountChange(String(fromToken.balance))
              }
            />

            <SwapDirectionButton onClick={handleSwapDirection} />

            <TokenInput
              name="toAmount"
              label="To"
              control={form.control}
              token={toToken}
              onTokenSelect={setToToken}
              onAmountChange={handleToAmountChange}
            />

            <ExchangeRate
              isLoading={isLoadingRates}
              fromSymbol={fromToken.symbol}
              toSymbol={toToken.symbol}
              rate={currentExchangeRate}
            />
          </CardContent>
          <CardFooter className="mt-4">
            <Button
              className="w-full"
              size="lg"
              type="submit"
              disabled={!isFormReady}
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {submitBtnText}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
