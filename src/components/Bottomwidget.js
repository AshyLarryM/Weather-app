import React from 'react'

const Bottomwidget = (props) => {

    const { data } = props;

    return (
      (data.name !== undefined) && data.weather !== undefined &&
        <div className='flex justify-evenly mx-4 p-6  bg-slate-300/40 rounded-2xl text-white relative z-1'>
          {/* feels like */}
          <div>
            <p className='font-bold'>Feels Like</p>
            {data.main ? <p>{data.main.feels_like.toFixed()}°F</p> : null}
          </div>
          {/* humidity */}
          <div>
            <p className='font-bold'>Humidity</p>
            {data.main ? <p>{data.main.humidity}%</p> : null}
          </div>
          {/* wind */}
          <div>
            <p className='font-bold'>Wind Speed</p>
            {data.wind ? <p>{data.wind.speed.toFixed()} mph</p> : null}
          </div>
        </div>
    );    
}

export default Bottomwidget