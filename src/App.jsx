import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function getUserData() {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + 'userData'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setUserData(userName, userSurname, age=120) {

  let updatedCookie = encodeURIComponent("userData") + "=" + encodeURIComponent(userName + ' ' + userSurname) + "; max-age=" + age;

  document.cookie = updatedCookie;
}

function RegistrationForm() {

  const [Name, setName] = useState('');
  const [Surname, setSurname] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  function handleClick() {
    setUserData(Name, Surname)

    alert(Name + Surname);
    alert(getUserData());
  }

  return (
    <>
      Имя
      <input type="" value={Name} onChange={handleNameChange} />
      Фамилия
      <input type="" value={Surname} onChange={handleSurnameChange} />

      <button onClick={handleClick}>
        Зарегистрироваться
      </button>
    </>
  )
}



function App() {

  return (
    <>
    <RegistrationForm />
    </>
  )
}

export default App
