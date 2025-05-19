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
      res.status(400).send();
      return;
    }

    const isEmailDomainValid = await subscriptionService.checkEmailDomain(
      body.email
    );
    if (!isEmailDomainValid) {
      res.status(400).send();
      return;
    }

    const subscription = await subscriptionService.createSubscription(body);

    await MailerService.sendSubscriptionConfirmation(
      subscription.email,
      subscription.secretToken
    );

    res.status(200).json(subscription);
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
    res.sendStatus(400);
    return;
  }

  const subscriptionId = await subscriptionService.findWithToken(token);
  if (!subscriptionId) {
    res.sendStatus(404);
    return;
  }

  await subscriptionService.confirmSubscription(subscriptionId);
  res.status(200).send("<h1>Subscription confirmed</h1>");
};

export const cancelSubscription = async (
  req: Request<{ token: string }>,
  res: Response
) => {
  const { token } = req.params;

  if (token.length !== TOKEN_LENGTH) {
    res.sendStatus(400);
    return;
  }

  const subscriptionId = await subscriptionService.findWithToken(token);
  if (!subscriptionId) {
    res.sendStatus(404);
    return;
  }

  await subscriptionService.cancelSubscription(subscriptionId);
  res.status(200).send("<h1>Subscription canceled</h1>");
};
