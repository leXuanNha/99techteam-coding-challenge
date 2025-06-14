import {
  ATOMIcon,
  BUSDIcon,
  ETHIcon,
  GMXIcon,
  IRISIcon,
  LUNAIcon,
  rATOMIcon,
  USDCIcon,
  WBTCIcon,
  wstETHIcon,
  ZILIcon,
} from "@/assets";
import type { Token } from "@/@types/token";

export const SUPPORTED_TOKENS: Token[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    balance: 1.45,
    logo: ETHIcon,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    balance: 2500,
    logo: USDCIcon,
  },
  {
    symbol: "ATOM",
    name: "ATOM",
    balance: 1000,
    logo: ATOMIcon,
  },
  {
    symbol: "BUSD",
    name: "BUSD",
    balance: 2000,
    logo: BUSDIcon,
  },
  {
    symbol: "GMX",
    name: "GMX",
    balance: 12000,
    logo: GMXIcon,
  },
  {
    symbol: "IRIS",
    name: "IRIS",
    balance: 500,
    logo: IRISIcon,
  },
  {
    symbol: "LUNA",
    name: "LUNA",
    balance: 30200,
    logo: LUNAIcon,
  },
  {
    symbol: "rATOM",
    name: "rATOM",
    balance: 15600,
    logo: rATOMIcon,
  },
  {
    symbol: "WBTC",
    name: "WBTC",
    balance: 0.08,
    logo: WBTCIcon,
  },
  {
    symbol: "wstETH",
    name: "wstETH",
    balance: 3,
    logo: wstETHIcon,
  },
  {
    symbol: "ZIL",
    name: "ZIL",
    balance: 245000,
    logo: ZILIcon,
  },
];
