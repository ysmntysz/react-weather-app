
import "bootstrap/dist/css/bootstrap.min.css";
import { faArrowDown, faArrowUp, faPercent, faSearchLocation, faTemperature1, faWind } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(
    {
      celcius: 15,
      name: "İstanbul",
      humidity: 35,
      feel_like: 1,
      wind:10,
      image:"../../images/cloudly.png"
    }
  )

  const [location, setLocation] = useState("")

  const handleClick = () =>{
    if(location !== ""){
      const getData = async() =>{
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${import.meta.env.VITE_WEATHER_API}&units=metric`)
        .then(result =>{
          let imgPath ="";
          if(result.data.weather[0].main  == "Clouds"){
            imgPath = "../../images/cloudly.png"
          }else if(result.data.weather[0].main  == "Clear"){
            imgPath = "../../images/sunny.png"
          }
          else if(result.data.weather[0].main  == "Rain"){
          imgPath = "../../images/rain.png"
        }
        else if(result.data.weather[0].main  == "Mist"){
          imgPath = "../../images/foggy.png"
        }
          setData({...data, celcius: result.data.main.temp, name: result.data.name, humidity:result.data.main.humidity, feel_like: result.data.main.feels_like, min_temp:result.data.main.temp_min, max_temp: result.data.main.temp_max ,wind:result.data.wind.speed,image: imgPath})
          console.log(result.data)
        })
        .catch( err => console.log(err));
        
      }
      getData();
    }
  }
  
 
  return (
    <>
      <div className="content">
        <div className="bg-img">
          <img src="../../images/background.jpg" alt="Background" />
        </div>
        <div className="weather-info">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-12">               
                <div className="weather-box">
                <div className="weather-search-box">
                  <input type="text"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      placeholder='Şehir giriniz'
                    />
                  <button onClick={handleClick} className='search-button'><FontAwesomeIcon className='search-icon' icon={faSearchLocation}/></button>
                </div>
                <div className="weather-box-info">
                  <span className='city-name'>{data.name}</span>
                  <img src={data.image} alt="" />
                  <span className="degree-text">{data.celcius} &#8451;</span>
                </div>
                <div className="other-details">
                  <div>
                    <span>Rüzgar: {data.wind}</span>
                    <FontAwesomeIcon icon={faWind}/>
                  </div>
                  <div>
                    <span>Hissedilen Sıcaklık: {data.feel_like} &#8451;</span>
                    <FontAwesomeIcon icon={faTemperature1}/>
                  </div>
                  <div>
                    <span>Nem: {data.humidity}</span>
                    <FontAwesomeIcon icon={faPercent}/>
                  </div>
                </div>
              </div>  
            </div>       
          </div>
          </div>
        </div>
      </div>
    </>

       
  )
}

export default App
