import React, { useState, useEffect } from 'react'
import './style.css';
import SearchIcon from './images/search.png';
import Rain from './images/rain.png';
import Clear from './images/clear.png';
import Drizzle from './images/drizzle.png';
import Clouds from './images/clouds.png';
import Snow from './images/snow.png';
import Mist from './images/mist.png';
import Humidity from './images/humidity.png';
import Wind from './images/wind.png';

const Home = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const [isStyle, setStyle] = useState(false);
    const [isImage, setImage] = useState(Clear);
    const [searchClicked, setSearchClicked] = useState(false);
    const API_KEY = 'YOUR_API_TOKEN';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;


    const fetchWeatherData = async () => {
        try {
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setWeatherData(data);
            setError('');
          } else {
            throw new Error('City not found. Please try again.');
          }
        } catch (error) {
          setError(error.message);
          setWeatherData(null);
        }
      };


          
    useEffect(() => {
        if (searchClicked && city) {
          fetchWeatherData();
          updateImage();
          setSearchClicked(false); // Reset searchClicked after fetching data
        }
      }, [city, searchClicked, API_KEY]);

      const updateImage = () => {

        try {
            if (isStyle === true) {
                if (weatherData.weather[0].main === "Rain") {
                    setImage(Rain);
                }

                else if (weatherData.weather[0].main === "Drizzle") {
                    setImage(Drizzle);
                }

                else if (weatherData.weather[0].main === "Mist") {
                    setImage(Mist);
                }

                else if (weatherData.weather[0].main === "Clear") {
                    setImage(Clear);
                }

                else if (weatherData.weather[0].main === "Clouds") {
                    setImage(Clouds);
                }

                else if (weatherData.weather[0].main === "Snow") {
                    setImage(Snow);
                }
            }
        }
        catch (error) {
            setError(error.message);
            setWeatherData(null);
        }
    }
    

    const handleSearch = () => {
        if (city) {
            setStyle(true);
            setSearchClicked(true);
            // fetchWeatherData();
        }

    };
    const handleInputChange = (event) => {
        setCity(event.target.value);
    };


    return (
        <>
            <div className='card'>
                <div className='search'>
                    <input type='text' placeholder='Enter City Name' spellCheck='false' value={city} onChange={handleInputChange} />
                    <button onClick={handleSearch}><img src={SearchIcon} alt='SearchIcon' /></button>
                </div>

                {weatherData ? (
                    <div className='weather' style={{
                        display: isStyle ? 'block' : 'none',
                    }}>
                        <img src={isImage} alt='Rain' className='wheather-icon' />
                        <h1 className='temp'>{Math.round(weatherData.main.temp)}°C</h1>
                        <h2 className='city'>{weatherData.name}</h2>
                        <div className='details'>
                            <div className='col'>
                                <img src={Humidity} alt='Humidity' />
                                <div>
                                    <p className='humidity'>{weatherData.main.humidity}%</p>
                                    <p>Humidity</p>
                                </div>
                            </div>

                            <div className='col'>
                                <img src={Wind} alt='Humidity' />
                                <div>
                                    <p className='wind'>{weatherData.wind.speed} KM/hr</p>
                                    <p>Wind Speed</p>
                                </div>
                            </div>
                        </div>
                    </div>) : (
                    <p className='error'>{error && <p>{error}</p>}</p>
                )}
            </div>
        </>
    )
}

export default Home
