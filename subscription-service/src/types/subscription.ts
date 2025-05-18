import { SubscribeDto } from "../dto/subscribe.dto";

export type SubscriptionWithSecret = SubscribeDto & {
  secretToken: string;
};
