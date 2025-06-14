import { Button } from "@/components/ui/button";

type MaxButtonProps = {
  onClick: () => void;
};

export default function MaxButton({ onClick }: MaxButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="h-auto py-0 px-1 text-xs text-primary hover:text-primary/80 hover:bg-transparent"
      onClick={onClick}
    >
      Max
    </Button>
  );
}
