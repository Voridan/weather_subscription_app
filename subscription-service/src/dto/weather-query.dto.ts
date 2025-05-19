import { IsString } from "class-validator";

export class WeatherQueryDto {
  @IsString()
  city!: string;
}
