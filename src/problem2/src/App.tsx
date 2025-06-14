import { TokenSwapCard } from "@/components/swap";
import { SnackbarProvider } from "notistack";

export default function App() {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <TokenSwapCard />
      </div>
    </SnackbarProvider>
  );
}
