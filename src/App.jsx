import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [amount, setAmount] = useState("");
  const [fromConvert, setFromConvert] = useState('EUR');
  const [toConvert, setToConvert] = useState('USD');
  const [convertRate, setConvertRate] = useState('');

  useEffect(() => {

    if (amount === "") {
      setConvertRate("");
      return; // No need to make the API request when the input is empty
    }

    const controller = new AbortController();

    async function converter() {
      try {
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromConvert}&to=${toConvert}`);
        const data = await response.json()
        setConvertRate(Object.entries(data.rates)[0][1]);
      } catch (error) {
        console.log(error, "error");
      }
    }

    converter();


    return function cleanup() {
      controller.abort();
    };
  }, [amount, fromConvert, toConvert]);

  // Function to handle input value changes and synchronize input fields
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setConvertRate(""); // Clear the conversion result when the input value changes
  };

  const handleFromConvertChange = (e) => {
    setFromConvert(e.target.value);
    setConvertRate(""); // Clear the conversion result when the conversion currency changes
  };

  const handleToConvertChange = (e) => {
    setToConvert(e.target.value);
    setConvertRate(""); // Clear the conversion result when the conversion currency changes
  };

  return (
    <>
      <div className='MainDiv'>
        <h1 className='heading'>Currrency Converter</h1>
        <div className='fromConvert'>
          <input type="text" className='input' placeholder='Type amount here' value={amount} onChange={handleAmountChange} />

          <select name="from" id="fromConvert" value={fromConvert} onChange={handleFromConvertChange}>
            <option value="Select">Select</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="AUD">AUD</option>
            <option value="BGN">BGN</option>
            <option value="BRL">BRL</option>
            <option value="CAD">CAD</option>
            <option value="CHF">CHF</option>
            <option value="CNY">CNY</option>
            <option value="CZK">CZK</option>
            <option value="DKK">DKK</option>
            <option value="GBP">GBP</option>
            <option value="HKD">HKD</option>
            <option value="HUF">HUF</option>
            <option value="IDR">IDR</option>
            <option value="ILS">ILS</option>
            <option value="ISK">ISK</option>
            <option value="JPY">JPY</option>
            <option value="KRW">KRW</option>
          </select>
          
        </div>
        <h2>Equals to</h2>
        <div className='toConvert'>
          <input type="text" className='input' value={convertRate} />

          <select name="from" id="toConvert" value={toConvert} onChange={handleToConvertChange}>

            <option value="Select">Select</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="AUD">AUD</option>
            <option value="BGN">BGN</option>
            <option value="BRL">BRL</option>
            <option value="CAD">CAD</option>
            <option value="CHF">CHF</option>
            <option value="CNY">CNY</option>
            <option value="CZK">CZK</option>
            <option value="DKK">DKK</option>
            <option value="GBP">GBP</option>
            <option value="HKD">HKD</option>
            <option value="HUF">HUF</option>
            <option value="IDR">IDR</option>
            <option value="ILS">ILS</option>
            <option value="ISK">ISK</option>
            <option value="JPY">JPY</option>
            <option value="KRW">KRW</option>

          </select>
          
        </div>
      </div>




    </>
  )

}

export default App
