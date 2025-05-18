import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT!),
  secure: true,
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

export class MailerService {
  static async sendSubscriptionConfirmation(email: string, token: string) {
    const htmlPath = path.join(
      __dirname,
      "..",
      "templates",
      "subscription-confirmation.html"
    );
    let html = await fs.readFile(htmlPath, "utf-8");

    const confirmUrl = `${process.env.API_DOMAIN}/confirm/${token}`;
    const cancelUrl = `${process.env.API_DOMAIN}/unsubscribe/${token}`;

    html = html
      .replace("{{CONFIRM_URL}}", confirmUrl)
      .replace("{{CANCEL_URL}}", cancelUrl);

    await transporter.sendMail({
      from: `"Weather App" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Confirm Your Weather Subscription",
      html,
    });
  }
}
