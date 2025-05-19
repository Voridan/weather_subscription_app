export const getWeather = (city) => {
  return fetch(
    `${process.env.API_DOMAIN}/api/weather?city=${encodeURIComponent(city)}`
  );
};
