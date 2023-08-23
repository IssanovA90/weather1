import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
export default function ProfilePage() {
  const [cityHistory, setCityHistory] = useState([]);
  useEffect(() => {
    const savedHistory = localStorage.getItem("cityHistory");
    if (savedHistory) {
      const news = JSON.parse(savedHistory);
      const unique = [...new Set(news)].map((city) => city.toUpperCase());
      setCityHistory(unique);
    }
  }, []);
  return (
    <div>
      <ul>
        {cityHistory.map((city, index) => (
          <li key={index}>
            <Link to={`/${city}`}>{city}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
