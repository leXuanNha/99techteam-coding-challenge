var sum_to_n_a = function (n) {
  // your code here
  if (n <= 0) return 0;
  var result = 0;
  for (var i = 1; i <= n; i++) {
    result = result + i;
  }
  return result;
};

var sum_to_n_b = function (n) {
  // your code here
  if (n <= 0) return 0;
  return n + sum_to_n_b(n - 1);
};

var sum_to_n_c = function (n) {
  // your code here
  return (n * (n + 1)) / 2;
};
