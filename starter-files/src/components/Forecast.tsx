import { useState } from 'react'
import {
  getHumidityValue,
  getPop,
  getSunTime,
  getVisibilityValue,
  getWindDirection,
} from '../helpers'
import { forecastType } from '../types'
import Sunrise from './Icons/Sunrise'
import Sunset from './Icons/Sunset'
import Tile from './Tile'

type Props = {
  data: forecastType
}

const Degree = ({ temp }: { temp: number }): JSX.Element => (
  <span>
    {temp}
    <sup>o</sup>
  </span>
)

export const Forecast = ({ data }: Props): JSX.Element => {
  const today = data.list[0]

  console.log(data)

  return (
    <div className="  h-full w-full md:w-2/5 p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded text-zinc-700">
      <div className="mx-auto w-[300px]">
        <section className="text-center">
          <h1 className="text-4xl font-extrabold">
            <Degree temp={Math.round(today.main.temp)} />
          </h1>
          <p className="text-sm">
            {today.weather[0].main}: {today.weather[0].description}
          </p>
          <p>
            H:
            <Degree temp={Math.ceil(today.main.temp_max)} />
            &nbsp;L:
            <Degree temp={Math.floor(today.main.temp_min)} />
          </p>
          <h2 className="text-2xl font-black">
            {data.name} <span className="font-light">{data.country}</span>
          </h2>
        </section>
        <section tabIndex={0} className="flex overflow-x-scroll mt-4 pb-2 mb-5">
          {data.list.map((item, i) => (
            <div
              className="inline-block text-center w-[50px] flex-shrink-0"
              key={i}
            >
              <p className="text-sm">
                {i === 0
                  ? 'Now'
                  : new Date(item.dt * 1000).toLocaleString('en-AU', {
                      hour: 'numeric',
                      hour12: true,
                    })}
              </p>
              <img
                alt={`weather-icon-${item.weather[0].description}`}
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              ></img>
              <p className="text-sm font-bold">
                <Degree temp={Math.round(item.main.temp)} />
              </p>
            </div>
          ))}
        </section>
        <section className="flex flex-wrap justify-between text-zinc-700">
          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-ls py-4 mb-5">
            <p className="mb-2">Sunrise</p>
            <Sunrise />
            <p className="mt-2">{getSunTime(data.sunrise, data.timezone)}</p>
          </div>
          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-ls py-4 mb-5">
            <p className="mb-2">Sunset</p>
            <Sunset />
            <p className="mt-2">{getSunTime(data.sunset, data.timezone)}</p>
          </div>
          <Tile
            icon="wind"
            title="Wind"
            info={`${Math.round(today.wind.speed)} km/h`}
            description={`${getWindDirection(
              Math.round(today.wind.deg)
            )}, gusts ${today.wind.gust.toFixed(1)} km/h`}
          ></Tile>
          <Tile
            icon="feels"
            title="Feels like"
            info={<Degree temp={Math.round(today.main.feels_like)} />}
            description={`Feels ${
              Math.round(today.main.feels_like) < Math.round(today.main.temp)
                ? 'colder'
                : 'warmer'
            }`}
          ></Tile>
          <Tile
            icon="humidity"
            title="Humidity"
            info={`${today.main.humidity}`}
            description={getHumidityValue(today.main.humidity)}
          ></Tile>
          <Tile
            icon="pop"
            title="Precipitation"
            info={`${Math.round(today.pop) * 1000}`}
            description={`${getPop(today.pop)}, clouds at ${today.clouds.all}%`}
          ></Tile>
          <Tile
            icon="pressure"
            title="Pressure"
            info={`${today.main.pressure} hPa`}
            description={`${
              Math.round(today.main.pressure) < 1013 ? 'Lower' : 'Higher'
            } than standard`}
          ></Tile>
          <Tile
            icon="visibility"
            title="Visibility"
            info={`${(today.visibility / 1000).toFixed()} km`}
            description={`${getVisibilityValue(today.visibility)}`}
          ></Tile>
        </section>
      </div>
    </div>
  )
}
export default Forecast
