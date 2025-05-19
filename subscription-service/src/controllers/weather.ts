import { Request, Response } from "express";
import { WeatherQueryDto } from "../dto/weather-query.dto";
import subscriptionService from "../services/subscription";

export const getWeather = async (req: Request, res: Response) => {
  const { city } = req.validatedQuery as WeatherQueryDto;

  const cityExists = await subscriptionService.cityExists(city);
  if (!cityExists) {
    res.sendStatus(404);
    return;
  }
  try {
    const weatherApiKey = process.env.WEATHER_API_KEY;
    const weatherApiRes = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}`
    );

    const weather = await weatherApiRes.json();
    const { condition, temp_c: temperature, humidity } = weather.current;

    res
      .status(200)
      .json({ temperature, humidity, description: condition.text });
  } catch (error) {
    res.sendStatus(400);
  }
};
