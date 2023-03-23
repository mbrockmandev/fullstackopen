import './App.css';
import { useState, useEffect } from 'react';
import Notification from './components/Notification';
import Search from './components/Search';
import Content from './components/Content';
import countryController from './services/countryController';

const App = () => {
  const [notificationMessage, setNotificationMessage] = useState('');
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    getCountriesWithQuery(query);
  }, [query]);

  const getCountriesWithQuery = async (query) => {
    try {
      const searchResults = await countryController.getWithQuery(query);
      setCountries(searchResults);
      // console.log(searchResults);
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuery = (e) => {
    if (e.target.value.length > 3) {
      setQuery(e.target.value);
    }
  };

  const handleButtonClick = (index) => {
    const newSelectionArray = [...selectedCountries];
    newSelectionArray[index] = !newSelectionArray[index];
    setSelectedCountries(newSelectionArray);
  };

  return (
    <div className='App'>
      <Search
        value={query}
        handleQuery={handleQuery}
      />
      <Notification message={notificationMessage} />
      <Content
        countries={countries}
        selectedCountries={selectedCountries}
        onButtonClick={handleButtonClick}
      />
    </div>
  );
};

export default App;
