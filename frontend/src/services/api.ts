export async function getStock(symbol: string) {
  const res = await fetch(`http://10.160.143.228:8000/stock/${symbol}`);
  return res.json();
}
