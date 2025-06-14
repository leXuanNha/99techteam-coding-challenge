import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createSwapFormSchema,
  type SwapFormValues,
  type Token,
} from "@/@types/token";
import { SUPPORTED_TOKENS } from "@/constants/token";
import { useSnackbar } from "notistack";
import type { TokenPrice } from "@/@types/price";
import { fetchExchangeRates } from "@/api/rate";
import { getExchangeRate } from "@/utils/rate";
import { withCommas } from "@/utils/number";

export function useTokenSwap() {
  const [fromToken, setFromToken] = useState<Token>(SUPPORTED_TOKENS[0]);
  const [toToken, setToToken] = useState<Token>(SUPPORTED_TOKENS[1]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingRates, setIsLoadingRates] = useState(false);
  const [rates, setRates] = useState<TokenPrice[]>([]);

  const { enqueueSnackbar } = useSnackbar();

  // Fetch exchange rates on mount
  useEffect(() => {
    const loadExchangeRates = async () => {
      try {
        setIsLoadingRates(true);
        const rates = await fetchExchangeRates();
        setRates(rates);
      } catch (error) {
        console.error("Failed to load exchange rates:", error);
      } finally {
        setIsLoadingRates(false);
      }
    };

    loadExchangeRates();
  }, []);

  const currentExchangeRate = getExchangeRate(
    fromToken.symbol,
    toToken.symbol,
    rates
  );

  const form = useForm<SwapFormValues>({
    resolver: zodResolver(createSwapFormSchema(fromToken.balance)),
    defaultValues: {
      fromAmount: "",
      toAmount: "",
    },
    mode: "onChange",
  });

  const { watch, setValue, trigger } = form;

  const fromAmount = watch("fromAmount");
  const toAmount = watch("toAmount");

  useEffect(() => {
    form.clearErrors();
    trigger();
  }, [fromToken, toToken, trigger, form]);

  const handleSwapDirection = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);

    const tempAmount = fromAmount;
    setValue("fromAmount", toAmount);
    setValue("toAmount", tempAmount);
  };

  const handleCleanValue = (value: string) => {
    const filteredValue = value.replace(/[^0-9.]/g, "");

    const parts = filteredValue.split(".");
    const cleanValue =
      parts.length > 2
        ? parts[0] + "." + parts.slice(1).join("")
        : filteredValue;
    return cleanValue;
  };

  const handleFromAmountChange = (value: string) => {
    const cleanValue = handleCleanValue(value);

    setValue("fromAmount", cleanValue, { shouldValidate: true });

    if (cleanValue !== "" && cleanValue !== "0") {
      const numValue = Number.parseFloat(cleanValue.replace(/,/g, ""));
      if (!isNaN(numValue) && numValue > 0) {
        const convertedAmount = numValue * currentExchangeRate;
        setValue("toAmount", convertedAmount.toFixed(2), {
          shouldValidate: true,
        });
      }
    } else {
      setValue("toAmount", "", { shouldValidate: true });
    }
  };

  const handleToAmountChange = (value: string) => {
    const cleanValue = handleCleanValue(value);

    setValue("toAmount", cleanValue, { shouldValidate: true });

    if (cleanValue !== "" && cleanValue !== "0") {
      const numValue = Number.parseFloat(cleanValue.replace(/,/g, ""));
      if (!isNaN(numValue) && numValue > 0) {
        const convertedAmount = numValue / currentExchangeRate;
        setValue("fromAmount", convertedAmount.toFixed(6), {
          shouldValidate: true,
        });
      }
    } else {
      setValue("fromAmount", "", { shouldValidate: true });
    }
  };

  const onSubmit = async (data: SwapFormValues) => {
    try {
      setIsSubmitting(true);

      // Mock API call - wait for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Should refetch to get new updated token/balance data in the future

      enqueueSnackbar(
        `Successfully swapped ${withCommas(data.fromAmount)} ${
          fromToken.symbol
        } for ${withCommas(data.toAmount)} ${toToken.symbol}`,
        {
          variant: "success",
        }
      );

      form.reset({
        fromAmount: "",
        toAmount: "",
      });
    } catch {
      // Handle error case
      enqueueSnackbar("Something went wrong. Please try again.", {
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormReady =
    !isSubmitting &&
    !isLoadingRates &&
    fromAmount !== "" &&
    toAmount !== "" &&
    fromAmount !== "0" &&
    toAmount !== "0" &&
    form.formState.isValid;

  return {
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
  };
}
