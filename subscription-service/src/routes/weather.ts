import { Router } from "express";
import { getWeather } from "../controllers/weather";
import { validateQuery } from "../middlewares/validateQuery";
import { WeatherQueryDto } from "../dto/weather-query.dto";

const router = Router();

router.get("/", validateQuery(WeatherQueryDto), getWeather);

export default router;
