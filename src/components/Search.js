import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Search.css';
export default function Search() {
    const navigate = useNavigate();
    const [cityName, setCityName] = useState('');
    const [cityHistory, setCityHistory] = useState([]);
    useEffect(() => {
        const savedHistory = localStorage.getItem("cityHistory")
        if (savedHistory) {
            setCityHistory(JSON.parse(savedHistory));
        }
    }, []);
    const onClick = () => {
        if (cityName.trim() === '') {
            return;
        }
        const updatedHistory = [...cityHistory, cityName];
        setCityHistory(updatedHistory);
        localStorage.setItem("cityHistory", JSON.stringify(updatedHistory));
        navigate(`/${cityName}`);
    };
    const handleChange = e => {
        setCityName(e.target.value);
    };
    return (
        <div className="inputStyle">
            <input
                placeholder="Напишите город"
                type='text'
                value={cityName}
                onChange={handleChange}
            />
            <button onClick={onClick}>Find</button>
        </div>
    );
}