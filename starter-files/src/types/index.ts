export type optionType = {
  name: string
  lat: number
  lon: number
  country: string
}

export type forecastType = {
  name: string
  country: string
  sunset: number
  sunrise: number
  timezone: number

  list: [
    {
      dt: number
      main: {
        feels_like: number
        humidity: number
        pressure: number
        temp: number
        temp_min: number
        temp_max: number
      }
      weather: [
        {
          main: string
          icon: string
          description: string
        }
      ]
      wind: {
        speed: number
        gust: number
        deg: number
      }
      clouds: {
        all: number
      }
      pop: number
      visibility: number
    }
  ]
}
