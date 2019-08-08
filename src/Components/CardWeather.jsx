import React from 'react';

const CardWeather = ({
    name,
    temp,
    temp_max,
    temp_min,
    humidity,
    windSpeed,
    description,
    weatherIcon
  }) => {
    return (  
      <div class="container">
      <div class="widget">
        <div class="details">
          <div class="temperature">{name} </div>
          <div class="temperature">{temp} &deg;</div>
          <div class="summary">
            <p class="summaryText">{description}</p>
          </div>
          <div class="precipitation">Humidity: {humidity}%</div>
          <div class="wind">Wind Speed: {windSpeed}m/s</div>
        </div>
        
   
        <div class="pictoCloudBig"><i className={`wi ${weatherIcon} display-1`}/></div>
        
      </div>
    </div>
    );
}
 
export default CardWeather;