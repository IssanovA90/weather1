import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiBlock } from 'react-icons/bi'
import { IoIosThunderstorm } from 'react-icons/io'
import { BsFillCloudDrizzleFill } from 'react-icons/bs'
import { BsCloudRainFill } from 'react-icons/bs'
import { BsCloudSnow } from 'react-icons/bs'
import { AiFillCloud } from 'react-icons/ai'
import './Home.css'
const weatherCodes = {
    2: <IoIosThunderstorm />,
    3: <BsFillCloudDrizzleFill />,
    5: <BsCloudRainFill />,
    6: <BsCloudSnow />,
    8: <AiFillCloud />,
}
export default function Home() {
    const { cityName } = useParams()
    const [weather, setWeather] = useState({ temp: undefined, feels_like: undefined, wind_speed: undefined })
    const url = process.env.REACT_APP_API_URL
    const apiKey = process.env.REACT_APP_API_KEY
    const getCoordinates = async (cityName) => {
        const req = await fetch(`${url}/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`)
        const response = await req.json()
        const data = response[0]
        return {
            lat: data?.lat,
            lon: data?.lon
        }
    }
    const fetchWeather = async (lat, lon) => {
        if (lat !== undefined && lon !== undefined) {
            const req = await fetch(`${url}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
            const response = await req.json()
            return response
        }
        return {}
    }
    const getWeather = async (cityName) => {
        const coordinates = await getCoordinates(cityName)
        const weather = await fetchWeather(coordinates.lat, coordinates.lon)
        console.log(weather);
        setWeather({
            temp: weather.main.temp,
            feels_like: weather.main.feels_like,
            wind_speed: weather.wind.speed,
            name: weather.name,
            codeOfWeather: weather.weather[0].id.toString()[0],
        })
    }
    useEffect(() => {
        if (cityName !== undefined) {
            getWeather(cityName)
        }
    }, [])
    const temps = Math.round(weather.temp)
    const tempFeels_like = Math.round(weather.feels_like)
    return (
        <>
            {cityName !== undefined &&
                <div className="cityInfo">
                    {weather.temp !== undefined &&
                        <div className="text">
                            <h1>{weather.name}</h1>
                            <div className="icon1">{weatherCodes[String(weather.codeOfWeather)]}</div>
                            <h1>Температура {temps} °C</h1>
                            <h1>Ощущается как {tempFeels_like} °C</h1>
                            <h1>Скорость ветра {weather.wind_speed} м/c</h1>
                        </div>}
                </div>}
            {cityName === undefined &&
                <div className="notFound">
                    <div className="icon"><BiBlock /></div>
                    <h1 >Город не наиден!</h1>
                </div>}
        </>
    )
}