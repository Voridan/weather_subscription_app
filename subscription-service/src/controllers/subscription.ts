import { Request, Response } from "express";
import { SubscribeDto } from "../dto/subscribe.dto";
import subscriptionService from "../services/subscription";
import { MailerService } from "../services/mailer";
import { TOKEN_LENGTH } from "../utils/secret-token";

export const createSubscription = async (
  req: Request<{}, {}, SubscribeDto>,
  res: Response
) => {
  const { body } = req;

  try {
    const emailExists = await subscriptionService.emailExists(body.email);
    if (emailExists) {
      res.status(409).json({ message: "Email already subscribed" });
      return;
    }

    const isEmailDomainValid = await subscriptionService.checkEmailDomain(
      body.email
    );
    if (!isEmailDomainValid) {
      res.status(400).json({ message: "Invalid input" });
      return;
    }

    const subscription = await subscriptionService.createSubscription(body);

    await MailerService.sendSubscriptionConfirmation(
      subscription.email,
      subscription.secretToken
    );

    const { secretToken, ...publicData } = subscription;
    res.status(200).json(publicData);
  } catch (error) {
    console.log("subscription creation faild:", (error as Error).message);
    res.sendStatus(500);
  }
};

export const confirmSubscription = async (
  req: Request<{ token: string }>,
  res: Response
) => {
  const { token } = req.params;

  if (token.length !== TOKEN_LENGTH) {
    res.status(400).json({ message: "Invalid token" });
    return;
  }

  const subscriptionId = await subscriptionService.findWithToken(token);
  if (!subscriptionId) {
    res.status(404).json({ message: "Token not found" });
    return;
  }

  await subscriptionService.confirmSubscription(subscriptionId);
  res.status(200).json({ message: "Subscription confirmed successfully" });
};

export const cancelSubscription = async (
  req: Request<{ token: string }>,
  res: Response
) => {
  const { token } = req.params;

  if (token.length !== TOKEN_LENGTH) {
    res.status(400).json({ message: "Invalid token" });
    return;
  }

  const subscriptionId = await subscriptionService.findWithToken(token);
  if (!subscriptionId) {
    res.status(404).json({ message: "Token not found" });
    return;
  }

  await subscriptionService.cancelSubscription(subscriptionId);
  res.status(200).json({ message: "Unsubscribed successfully" });
};
