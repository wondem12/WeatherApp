import React from 'react';

const UpComingWeather = ({day, temp, weather,weatherIcon}) => {
 
  
    return <div className="weather__cont">
      <h3>{day}</h3>
    <i className={`wi ${weatherIcon} display-4`}/>
      <h4>{temp} &deg;</h4>
      <h5>{weather}</h5>
    </div>;
  }

  export default UpComingWeather;