import { MailingFrequency } from "../../prisma/generated/client";
import { IsEmail, IsEnum, IsString } from "class-validator";

export class SubscribeDto {
  @IsEmail()
  email!: string;

  @IsString()
  city!: string;

  @IsEnum(MailingFrequency)
  frequency!: MailingFrequency;
}
