import { useState } from "react";
import { getStock } from "../services/api";

export default function StockCheck() {
  const [symbol, setSymbol] = useState("");
  const [result, setResult] = useState(null);

  const checkStock = async () => {
    const data = await getStock(symbol);
    setResult(data);
  };

  return (
    <div>
      <input
        placeholder="Enter stock symbol (AAPL)"
        onChange={(e) => setSymbol(e.target.value)}
      />
      <button onClick={checkStock}>Check</button>

      {result && (
        <div>
          <p>Price: {result.finnhub_price}</p>
          <p>Status: {result.status}</p>
          <p>Score: {result.legitimacy_score}</p>
        </div>
      )}
    </div>
  );
}
