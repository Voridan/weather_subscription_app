import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const getMailBodyHtml = (data, apiDomain, token) => `
   <div style="font-family: sans-serif; line-height: 1.5;">
      <h2>Daily Weather Report for ${data.city}</h2>
      <p><strong>Temperature:</strong> ${data.temperature}°C</p>
      <p><strong>Humidity:</strong> ${data.humidity}%</p>
      <p><strong>Description:</strong> ${data.description}</p>
      <hr />
      <p style="font-size: 0.9em; color: #555;">
        To cancel your subscription, click 
        <a href="${apiDomain}/api/unsubscribe/${token}" style="color: #d00;">here</a>.
      </p>
    </div>
`;
