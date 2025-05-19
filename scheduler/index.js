import cron from "node-cron";
import dotenv from "dotenv";
import { sendHourlyEmails } from "./jobs/sendHourlyEmails.js";
import { sendDailyEmails } from "./jobs/sendDailyEmails.js";

dotenv.config();

// Щогодинно
cron.schedule("0 * * * *", () => {
  sendHourlyEmails().catch(console.error);
});

// Щоденно о 08:00
cron.schedule("0 8 * * *", () => {
  sendDailyEmails().catch(console.error);
});

console.log("📆 Scheduler запущено");
