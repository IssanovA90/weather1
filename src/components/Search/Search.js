import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
export default function Search() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const savedHistory = localStorage.getItem("cityHistory")
    ? localStorage.getItem("cityHistory").json.parse()
    : [];

  const onClick = () => {
    if (cityName.trim() === "") {
      return;
    }
    const updatedHistory = [...savedHistory, cityName];
    localStorage.setItem("cityHistory", JSON.stringify(updatedHistory));
    navigate(`/${cityName}`);
  };
  const handleChange = (e) => {
    setCityName(e.target.value);
  };
  return (
    <div className="inputStyle">
      <input
        placeholder="Напишите город"
        type="text"
        value={cityName}
        onChange={handleChange}
      />
      <button disabled={cityName === ""} onClick={onClick}>
        Find
      </button>
    </div>
  );
}
