import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const detectCurrency = async () => {
      try {
        const res = await axios.get('https://ipapi.co/json/');
        if (res.data.country_code === 'IN') {
          setCurrency('INR');
        } else {
          setCurrency('USD');
        }
      } catch (err) {
        console.error('Error detecting location:', err);
        setCurrency('USD'); // Default to USD
      } finally {
        setLoading(false);
      }
    };

    detectCurrency();
  }, []);

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'INR' ? 'USD' : 'INR'));
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency, loading }}>
      {children}
    </CurrencyContext.Provider>
  );
};
