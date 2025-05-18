import { Request, Response } from "express";
import { SubscribeDto } from "../dto/subscribe.dto";
import subscriptionService from "../services/subscription";
import { MailerService } from "../services/mailer";

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
