import { db } from "./dbClient.js";

export const getHourlySubscriptions = () => {
  return db.query(`
        SELECT * FROM "Subscription"
        WHERE confirmed = true
          AND frequency = 'HOURLY'
          AND (last_sent_at IS NULL OR last_sent_at <= NOW() - INTERVAL '1 hour')
      `);
};

export const getDailySubscriptions = () => {
  return db.query(`
        SELECT * FROM "Subscription"
        WHERE confirmed = true
          AND frequency = 'DAILY'
          AND (last_sent_at IS NULL OR last_sent_at <= NOW() - INTERVAL '1 day')
      `);
};

export const updateLastSentTime = (subId) => {
  return db.query(
    `UPDATE "Subscription" SET last_sent_at = NOW() WHERE id = $1`,
    [subId]
  );
};
