import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    // Fetch available currencies
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => {
        const currencyList = Object.keys(response.data.rates);
        setCurrencies(currencyList);
        setExchangeRate(response.data.rates[toCurrency]);
      });
  }, [toCurrency]);

  const convert = (e) => {
    e.preventDefault();
    // Fetch exchange rate
    axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(response => {
        setExchangeRate(response.data.rates[toCurrency]);
      });
  };

  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-5 text-center">Currency Converter</h1>
      <form onSubmit={convert}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Convert
        </button>
      </form>

      <div className="mt-5 text-center">
        <p className="text-lg">
          {amount} {fromCurrency} = {(amount * exchangeRate).toFixed(2)} {toCurrency}
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
