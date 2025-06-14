import type { ComponentType, HTMLAttributes } from "react";
import { z } from "zod";

export type Token = {
  symbol: string;
  name: string;
  balance: number;
  logo: ComponentType<HTMLAttributes<SVGElement>>;
};

export const createSwapFormSchema = (fromBalance: number) => {
  return z.object({
    fromAmount: z
      .string()
      .refine(
        (val) => {
          // Allow empty string
          if (val === "") return true;
          // Check if it's a valid number greater than 0
          const numValue = Number(val.replace(/,/g, ""));
          return !isNaN(numValue) && numValue > 0;
        },
        {
          message: "Must be greater than 0",
        }
      )
      .refine(
        (val) => {
          // Allow empty string
          if (val === "") return true;
          // Check balance only if value is provided
          const numValue = Number(val.replace(/,/g, ""));
          const numBalance = Number(String(fromBalance).replace(/,/g, ""));
          return numValue <= numBalance;
        },
        {
          message: "Amount exceeds balance",
        }
      ),
    toAmount: z.string().refine(
      (val) => {
        // Allow empty string
        if (val === "") return true;
        // Check if it's a valid number greater than 0
        const numValue = Number(val.replace(/,/g, ""));
        return !isNaN(numValue) && numValue > 0;
      },
      {
        message: "Must be greater than 0",
      }
    ),
  });
};

export type SwapFormValues = {
  fromAmount: string;
  toAmount: string;
};
