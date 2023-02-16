import { ChangeEvent, useEffect, useState } from 'react'
import { forecastType, optionType } from '../types'

export const useForecast = () => {
  const [term, setTerm] = useState<string>('')
  const [options, setOptions] = useState<[]>([])
  const [city, setCity] = useState<optionType | null>(null)
  var limit = 5

  const [forecast, setForecast] = useState<forecastType | null>(null)
  const [showLoader, setShowLoader] = useState<boolean>(false)

  const getSearchOptions = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=${limit}&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch((e) => console.log(e))
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setTerm(value)
    if (value === '') return
    getSearchOptions(value)
  }

  const onSubmit = () => {
    if (!city) return
    setShowLoader(true)
    getForecast(city)
    setTimeout(() => {
      setShowLoader(false)
    }, 1000)
  }

  const getForecast = (city: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 16),
        }
        setForecast(forecastData)
      })
      .catch((e) => console.log(e))
  }

  const onOptionSelect = (option: optionType) => {
    setCity(option)
  }
  useEffect(() => {
    if (city) {
      setTerm(city.name)
      setOptions([])
    }
  }, [city])

  return {
    term,
    options,
    forecast,
    showLoader,
    onInputChange,
    onOptionSelect,
    onSubmit,
  }
}

export default useForecast
