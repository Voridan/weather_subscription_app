import { getMailBodyHtml, transporter } from "../utils/mailer.js";
import { getWeather } from "../utils/api.js";
import {
  getHourlySubscriptions,
  updateLastSentTime,
} from "../utils/dbQueries.js";

export async function sendHourlyEmails() {
  console.log("[Hourly] Робимо розсилку…");
  try {
    const { rows } = await getHourlySubscriptions();

    for (const sub of rows) {
      const res = await getWeather(sub.city);

      if (res.ok) {
        const { temperature, humidity, description } = await res.json();

        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: sub.email,
          subject: `Weather in ${sub.city} (hourly)`,
          html: getMailBodyHtml(
            { city: sub.city, temperature, humidity, description },
            process.env.API_PUBLIC_DOMAIN,
            sub.secret_token
          ),
        });

        await updateLastSentTime(sub.id);
      }
    }
  } catch (e) {
    console.error("[Hourly] Помилка:", e);
  }
}
