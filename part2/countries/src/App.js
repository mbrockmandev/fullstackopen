import './App.css';
import { useState } from 'react';
import Notification from './components/Notification';
import Search from './components/Search';
import Content from './components/Content';
import countryController from './services/countryController';

const App = () => {
  const [notificationMessage, setNotificationMessage] = useState('');
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);

  const getCountriesWithQuery = async () => {
    try {
      const searchResults = await countryController.getWithQuery(query);
      console.log(searchResults);
      setCountries(searchResults);
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuery = (e) => {
    if (e.target.value.length > 2) {
      setQuery(e.target.value);
      getCountriesWithQuery(query);
    }
  };

  return (
    <div className='App'>
      <Search
        value={query}
        handleQuery={handleQuery}
      />
      <Notification message={notificationMessage} />
      <Content countries={countries} />
    </div>
  );
};

export default App;
