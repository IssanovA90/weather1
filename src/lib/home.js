const url = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const getCoordinates = async (cityName) => {
  const req = await fetch(
    `${url}/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
  );
  const response = await req.json();
  const data = response[0];
  return {
    lat: data?.lat,
    lon: data?.lon,
  };
};

export const fetchWeather = async (lat, lon) => {
  if (lat !== undefined && lon !== undefined) {
    const req = await fetch(
      `${url}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const response = await req.json();
    return response;
  }
  return {};
};

export const getWeather = async (cityName) => {
  const coordinates = await getCoordinates(cityName);
  const weather = await fetchWeather(coordinates.lat, coordinates.lon);
  if (!weather.main) {
    return;
  }
  console.log(weather);
  return weather
};
