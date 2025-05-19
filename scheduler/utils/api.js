export const getWeather = (city) => {
  return fetch(
    `${process.env.API_INTERNAL_DOMAIN}/api/weather?city=${encodeURIComponent(
      city
    )}`
  );
};
