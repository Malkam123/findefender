const BASE_URL = "http://10.160.143.228:8000";

export async function getStock(symbol) {
  const res = await fetch(`${BASE_URL}/stock/${symbol}`);
  return res.json();
}


// Phone fraud check
export async function checkPhone(phone) {
  const res = await fetch(`${BASE_URL}/phone/check/${phone}`);
  return res.json();
}

// URL phishing check
export async function checkURL(url) {
  const res = await fetch(`${BASE_URL}/url/check/${url}`);
  return res.json();
}
