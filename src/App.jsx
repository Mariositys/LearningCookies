import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, age=0) {

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + "; max-age=" + age;

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function RegistrationForm() {

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  function handleClick() {
    alert(inputValue);
  }

  return (
    <>
      Придумайте свой UID
      <input type="" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleClick}>
        Зарегистрироваться
      </button>
    </>
  )
}



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <RegistrationForm />
    </>
  )
}

export default App
