import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  SunIcon, 
  CloudIcon, 
  EyeDropperIcon,
  ArrowUpIcon,
  ArrowDownIcon 
} from '@heroicons/react/24/outline'

const WeatherWidget = ({ location }) => {
  const [weather, setWeather] = useState({
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    icon: 'partly-cloudy',
    forecast: [
      { day: 'Today', temp: '28°', condition: 'Partly Cloudy' },
      { day: 'Tomorrow', temp: '30°', condition: 'Sunny' },
      { day: 'Sat', temp: '26°', condition: 'Rainy' }
    ]
  })

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny':
      case 'Sunny':
        return <SunIcon className="h-8 w-8 text-yellow-500" />
      case 'cloudy':
      case 'Partly Cloudy':
        return <CloudIcon className="h-8 w-8 text-gray-500" />
      default:
        return <SunIcon className="h-8 w-8 text-yellow-500" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 text-white"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Weather</h3>
        <div className="text-sm opacity-90">{location}</div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-3xl font-bold">{weather.temperature}°C</div>
          <div className="text-sm opacity-90">{weather.condition}</div>
        </div>
        {getWeatherIcon(weather.condition)}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center space-x-2">
          <EyeDropperIcon className="h-4 w-4" />
          <span>Humidity: {weather.humidity}%</span>
        </div>
        <div className="flex items-center space-x-2">
          <ArrowUpIcon className="h-4 w-4" />
          <span>Wind: {weather.windSpeed} km/h</span>
        </div>
      </div>
      
      <div className="border-t border-white/20 pt-4">
        <div className="text-sm font-medium mb-2">3-Day Forecast</div>
        <div className="space-y-2">
          {weather.forecast.map((day, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="opacity-90">{day.day}</span>
              <div className="flex items-center space-x-2">
                <span>{day.temp}</span>
                <span className="opacity-75">{day.condition}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default WeatherWidget
