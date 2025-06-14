import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import type { Control } from "react-hook-form";
import TokenSelector from "./TokenSelector";
import type { SwapFormValues, Token } from "@/@types/token";
import MaxButton from "./MaxButton";

type TokenInputProps = {
  showMaxButton?: boolean;
  name: keyof SwapFormValues;
  label: string;
  token: Token;
  control: Control<SwapFormValues>;
  onTokenSelect: (token: Token) => void;
  onAmountChange: (value: string) => void;
  onMaxClick?: () => void;
};

export default function TokenInput({
  showMaxButton = false,
  control,
  name,
  label,
  token,
  onTokenSelect,
  onAmountChange,
  onMaxClick,
}: TokenInputProps) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">
          Balance: {token.balance} {token.symbol}
          {showMaxButton && onMaxClick && <MaxButton onClick={onMaxClick} />}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  placeholder="0.0"
                  onChange={(e) => onAmountChange(e.target.value)}
                  className="!text-3xl font-semibold border-none !rounded-none shadow-none p-0 h-auto focus-visible:ring-0"
                />
              </FormControl>
              <FormMessage className="text-xs mt-1" />
            </FormItem>
          )}
        />
        <TokenSelector selectedToken={token} onSelectToken={onTokenSelect} />
      </div>
    </div>
  );
}
