import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ChevronDown, Search } from "lucide-react";
import type { Token } from "@/@types/token";
import { SUPPORTED_TOKENS } from "@/constants/token";
import { withCommas } from "@/utils/number";

interface TokenSelectorProps {
  selectedToken: Token;
  onSelectToken: (token: Token) => void;
}

export default function TokenSelector({
  selectedToken,
  onSelectToken,
}: TokenSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mocking for now. Should get this token data from API
  const filteredTokens = SUPPORTED_TOKENS.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectToken = (token: Token) => {
    onSelectToken(token);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <selectedToken.logo />
          <span>{selectedToken.symbol}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select a token</DialogTitle>
        </DialogHeader>
        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or symbol"
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto space-y-3">
          {filteredTokens.map((token) => (
            <Button
              key={token.symbol}
              variant="ghost"
              className="w-full !h-12 justify-start gap-3 font-normal"
              onClick={() => handleSelectToken(token)}
            >
              <token.logo className="!w-8 !h-8 shrink-0" />
              <div className="flex flex-col items-start">
                <span>{token.symbol}</span>
                <span className="text-xs text-muted-foreground">
                  {token.name}
                </span>
              </div>
              <span className="ml-auto text-sm text-muted-foreground">
                {withCommas(token.balance)}
              </span>
            </Button>
          ))}
          {filteredTokens.length === 0 && (
            <div className="py-6 text-center text-muted-foreground">
              No tokens found
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
