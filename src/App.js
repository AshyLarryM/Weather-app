import './App.css';
import Sunny from './assets/Sunny.jpg';
import Hazy from './assets/Hazy.jpg';
import Night from './assets/Night.jpg';
import Rain from './assets/Rain.jpg';
// import Nighttime from './assets/Nighttime.jpg';
import Thunderstorm from './assets/Thunderstorm.jpg';
import Cloudy from './assets/Cloudy.jpg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Bottomwidget from './components/Bottomwidget';
import Weatherinfo from './components/Weatherinfo';


function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(Sunny);
  const [loading, setLoading] = useState(true);

  // get background image based on weather condition
  const getBackgroundImage = (weatherCondition) => {
    switch (weatherCondition) {
      case 'clear':
        return Sunny;
      case 'clouds':
        return Cloudy;
      case 'hazy':
        return Hazy;
      case 'rain':
        return Rain;
      case 'thunderstorm':
        return Thunderstorm;
      default:
        return Night;
    }
  };
  
  useEffect(() => {
    // Get user's location using Geolocation API
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      // Call OpenWeather API to get weather data
      const apiKey = process.env.REACT_APP_GEOLOCATION_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
      
      axios.get(url).then((res) => {
        setData(res.data);
        console.log(res.data);
  
        // Get background image based on weather condition
        const weatherCondition = res.data.weather[0].main.toLowerCase();
        const backgroundImage = getBackgroundImage(weatherCondition);
  
        setBackgroundImage(backgroundImage);
        setLoading(false);
      });
    });
  }, []);
  

  const searchLocation = (e) => {
    //if user presses enter, search for location
    if (e.key === 'Enter') {
      setLoading(true);
  
      const apiGatewayUrl = `https://iaxn6wz5a3.execute-api.us-east-1.amazonaws.com/Prod/search?location=${location}`;
  
      // Call API Gateway endpoint to get location data
      axios.get(apiGatewayUrl)
        .then((res) => {
          const data = JSON.parse(res.data.body);
          setData(data);
  
          // Get background image based on weather condition
          const weatherCondition = data.weather && data.weather.length > 0
            ? data.weather[0].main.toLowerCase()
            : 'unknown';
  
          const backgroundImage = getBackgroundImage(weatherCondition);
          setBackgroundImage(backgroundImage);
  
          setLoading(false);
        })
        // Handle error
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            alert('Location not found. Please try again.');
          } else {
            console.log(err);
          }
  
          setLoading(false);
        });
      setLocation('');
    }
  };
  
  return (
    <div>
      {loading ? (
        <div className='w-full h-full bg-blue-900/80 absolute -z-1 text-center'>Retrieving Location</div>
      ) : (
        <div className='h-screen text-center relative'>
          <div className='w-full h-full bg-gray-900/40 absolute -z-1'>
            <img
              className='w-full h-full object-cover mix-blend-overlay'
              src={backgroundImage}
              alt='Sunny'
            />
          </div>
  
          <div className='text-center p-8 relative text-white z-2'>
            <input
              className='text-xl px-4 rounded-xl border-2 bg-transparent z-10 placeholder:text-white text-center'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={searchLocation}
              placeholder='Enter location'
              type='text'
            />
          </div>
          <div className='relative m-auto h-[600px] flex flex-col justify-between pt-16 text-white'>
            <Weatherinfo data={data} />
            <Bottomwidget data={data} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;