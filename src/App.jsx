import { useEffect, useState } from 'react'
import './App.css'

function getUserData() {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + 'userData'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setUserData(userName, userSurname, age=30) {

  let updatedCookie = encodeURIComponent("userData") + "=" + encodeURIComponent(userName + ' ' + userSurname) + "; max-age=" + age;

  document.cookie = updatedCookie;
}

function deleteUserData() {
  document.cookie = encodeURIComponent("userData") + "=" + encodeURIComponent(' ') + "; max-age=" + '0';
}

function RegistrationForm({updateUserData}) {
  const [Name, setName] = useState('');
  const [Surname, setSurname] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  function handleClick() {
    setUserData(Name, Surname);
    updateUserData(getUserData())
  }

  return (
    <div>
      <div>
        <p>Имя</p>
        <input type="" value={Name} onChange={handleNameChange} />
      </div>
      
      <div>
        <p>Фамилия</p>
        <input type="" value={Surname} onChange={handleSurnameChange} />
      </div>

      <div className='button'>
        <button onClick={handleClick}>
          Зарегистрироваться
        </button>
      </div>
    </div>
  )
}

function AdditionalData() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  let loadData = async () => {
      await fetch('https://randomuser.me/api/')
        .then((result) => {
          result.json()
            .then(result => setData(result.results[0]));
            setIsLoading(false);
        }, 
        (error) => {
          setError(error.message);
          setIsLoading(false);
        });
  };


  
  useEffect(() => {
    if (!data && !error) {
      setIsLoading(true);
      loadData();
    }
  }, [])

  if (isLoading) {
    return (
      <div className='loader'></div>
    )
  }
  else {
    if (!error && data) {
      return (
        <>
          <div>{data.email}</div>
          <div>{data.cell}</div>
        </>
      )
    }
    else {
      return (
        <div>Не получилось загрузить: {error}</div>
      )
    }
  }
  
}


function App() {
  const [uData, setuData] = useState(getUserData())

  function handleClick() {
    deleteUserData();
    setuData(undefined);
  }

  if (uData === undefined) {
    return (
        <RegistrationForm 
          updateUserData={setuData}
        />
      )
  }
  else {
    return(
      <div>
        <div>
          <p>Добро пожаловать {uData}</p>
          <AdditionalData />
        </div>
        <div className='button'>
          <button onClick={handleClick}>
            Выйти
          </button>
        </div>
      </div>
    )
  }
  
}

export default App
