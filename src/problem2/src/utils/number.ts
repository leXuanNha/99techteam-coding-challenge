export function withCommas(input: number | string = "") {
  if (!input) return input;
  return String(input).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
