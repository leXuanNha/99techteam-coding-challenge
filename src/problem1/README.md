# Sum from 1 to n

This project provides three different JavaScript implementations to calculate the sum of all integers from 1 to `n`.

## Problem

Given a positive integer `n`, compute the sum:

```
sum(1, 2, ..., n)
```

Example:

```js
sum_to_n(5); // Output: 15
```

---

## Implementations

### `sum_to_n_a` — Iterative Approach

```js
var sum_to_n_a = function (n) {
  if (n <= 0) return 0;
  var result = 0;
  for (var i = 1; i <= n; i++) {
    result = result + i;
  }
  return result;
};
```

- Uses a `for` loop to add numbers from 1 to `n`
- Time Complexity: **O(n)**

---

### `sum_to_n_b` — Recursive Approach

```js
var sum_to_n_b = function (n) {
  if (n <= 0) return 0;
  return n + sum_to_n_b(n - 1);
};
```

- Uses recursion with a base case at `n <= 0`
- Time Complexity: **O(n)**
- ⚠️ Not safe for large `n` due to stack overflow risk

---

### `sum_to_n_c` — Mathematical Formula

```js
var sum_to_n_c = function (n) {
  return (n * (n + 1)) / 2;
};
```

- Uses the arithmetic series formula
- Time Complexity: **O(1)**
- ✅ Most efficient solution

---

## Usage

```js
console.log(sum_to_n_a(5)); // 15
console.log(sum_to_n_b(5)); // 15
console.log(sum_to_n_c(5)); // 15
```

---
