import { transporter } from "../utils/mailer.js";
import { getWeather } from "../utils/api.js";
import {
  getDailySubscriptions,
  updateLastSentTime,
} from "../utils/dbQueries.js";

export async function sendDailyEmails() {
  console.log("[Daily] Робимо розсилку…");
  try {
    const { rows } = await getDailySubscriptions();

    for (const sub of rows) {
      const res = await getWeather(sub.city);

      if (res.ok) {
        const { temperature, humidity, description } = await res.json();

        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: sub.email,
          subject: `Weather in ${sub.city} (Daily)`,
          text: `Temperature: ${temperature}°C\nHumidity:${humidity}%\nDescription: ${description}`,
        });

        await updateLastSentTime(sub.id);
      }
    }
  } catch (e) {
    console.error("[Hourly] Помилка:", e);
  }
}
