export function formatPrice(price: number, currency?: string): string {
  const new_price = Number(price.toFixed(1));
  if (currency) {
    return `${currency}${new_price.toLocaleString()}`;
  } else {
    return `$${new_price.toLocaleString()}`;
  }
}
