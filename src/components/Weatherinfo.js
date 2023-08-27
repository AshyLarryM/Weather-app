import React from 'react'

const Weatherinfo = (props) => {

    const {data} = props;

  return (
    <div className='relative m-auto h-[700px] flex flex-col justify-between pt-8 text-white'>
        <div>
          {/* location */}
          <div>
            <p className='text-4xl pb-4'>{data.name}</p>
          </div>
          {/* temp */}
          <div>
            {data.weather ? <h1 className='text-8xl font-bold'>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          {/* description */}
          <div>
            {data.weather ? <h2 className='text-5xl pt-24'>{data.weather[0].main}</h2> : null}
          </div>
        </div>
    </div>
  )
}

export default Weatherinfo