import { Button } from "@/components/ui/button";
import { ArrowDownUp } from "lucide-react";

type SwapDirectionButtonProps = {
  onClick: () => void;
};

export default function SwapDirectionButton({
  onClick,
}: SwapDirectionButtonProps) {
  return (
    <div className="flex justify-center">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="rounded-full bg-primary/10 hover:bg-primary/20"
        onClick={onClick}
      >
        <ArrowDownUp className="h-4 w-4" />
      </Button>
    </div>
  );
}
