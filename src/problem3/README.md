# WalletPage Code Review

## 1. Overlapping Types

### Issue:

`FormattedWalletBalance` has duplicated fields from `WalletBalance`. It should extend from `WalletBalance` instead.

### Fix:

```ts
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}
```

---

## 2. Missing `blockchain` Field in `WalletBalance`

### Issue:

The `WalletBalance` interface does not include a `blockchain` field, yet the code references `balance.blockchain`.

### Fix:

Add a `blockchain` field and define an enum if the possible values are known.

```ts
enum Blockchain {
  Osmosis = "Osmosis",
  Ethereum = "Ethereum",
  Arbitrum = "Arbitrum",
  Zilliqa = "Zilliqa",
  Neo = "Neo",
}

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}
```

---

## 3. `getPriority` Function Type and Placement

### Issue:

The `getPriority` function uses `any` type and is defined inside the component, which is unnecessary.

### Fix:

Move it outside and specify the parameter type:

```ts
const getPriority = (blockchain: Blockchain): number => {
  switch (blockchain) {
    case Blockchain.Osmosis:
      return 100;
    case Blockchain.Ethereum:
      return 50;
    case Blockchain.Arbitrum:
      return 30;
    case Blockchain.Zilliqa:
    case Blockchain.Neo:
      return 20;
    default:
      return -99;
  }
};
```

---

## 4. Incorrect Filter Logic in `sortedBalances`

### Issue:

The filtering logic uses an undeclared variable and allows balances with non-positive amounts.

### Fix:

```ts
.filter((balance) => {
  const priority = getPriority(balance.blockchain);
  return priority > -99 && balance.amount > 0;
})
```

---

## 5. `useMemo` Dependency Optimization

### Issue:

The `prices` dependency is included in `useMemo`, but is not used inside.

### Fix:

```ts
}, [balances]);
```

---

## 6. Improper Use of `toFixed()`

### Issue:

Using `balance.amount.toFixed()` without specifying decimal places may yield inconsistent results.

### Fix:

```ts
formatted: balance.amount.toFixed(2);
```

---

## 7. Mapping the Wrong Array

### Issue:

The `rows` array is built from `sortedBalances` instead of `formattedBalances`.

### Fix:

```ts
const rows = formattedBalances.map((balance, index) => {
  ...
});
```

---

## 8. Simplified Sorting Function

### Suggestion:

Simplify sorting logic with:

```ts
.sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain));
```

---

## 9. Add Type Declarations for Custom Hooks

### Suggestion:

Annotate hook return values for clarity.

```ts
const balances: WalletBalance[] = useWalletBalances();
const prices: Record<string, number> = usePrices();
```

---

## 10. Defensive Check for Missing Prices

### Issue:

`prices[balance.currency]` might be undefined, which would lead to `NaN`.

### Fix:

```ts
const usdValue = (prices[balance.currency] ?? 0) * balance.amount;
```

---

## 11. Using Index as Key

### Issue:

Using `index` as a `key` prop is discouraged.

### Fix:

If `currency` is unique:

```tsx
<WalletRow
  className={classes.row}
  key={balance.currency}
  amount={balance.amount}
  usdValue={usdValue}
  formattedAmount={balance.formatted}
/>
```

---

## ✅ Suggested Improved Code

```tsx
enum Blockchain {
  Osmosis = "Osmosis",
  Ethereum = "Ethereum",
  Arbitrum = "Arbitrum",
  Zilliqa = "Zilliqa",
  Neo = "Neo",
}

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

const getPriority = (blockchain: Blockchain): number => {
  switch (blockchain) {
    case Blockchain.Osmosis:
      return 100;
    case Blockchain.Ethereum:
      return 50;
    case Blockchain.Arbitrum:
      return 30;
    case Blockchain.Zilliqa:
    case Blockchain.Neo:
      return 20;
    default:
      return -99;
  }
};

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances: WalletBalance[] = useWalletBalances();
  const prices: Record<string, number> = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter(
        (balance) => getPriority(balance.blockchain) > -99 && balance.amount > 0
      )
      .sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain));
  }, [balances]);

  const formattedBalances: FormattedWalletBalance[] = sortedBalances.map(
    (balance) => ({
      ...balance,
      formatted: balance.amount.toFixed(2),
    })
  );

  const rows = formattedBalances.map((balance) => {
    const usdValue = (prices[balance.currency] ?? 0) * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={balance.currency}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};
```
