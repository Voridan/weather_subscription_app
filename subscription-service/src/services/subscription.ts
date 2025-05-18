import { SubscribeDto } from "../dto/subscribe.dto";
import { SubscriptionRepository } from "../repositories/subsription";
import dns from "dns/promises";
import { generateSecretToken } from "../utils/secret-token";

class SubscriptionService {
  constructor(
    private readonly suscriptionRepo = new SubscriptionRepository()
  ) {}

  createSubscription(subscriptionDto: SubscribeDto) {
    const secretToken = generateSecretToken();

    return this.suscriptionRepo.create({
      ...subscriptionDto,
      city: subscriptionDto.city.toLowerCase(),
      secretToken,
    });
  }

  async emailExists(email: string) {
    const doesExists = await this.suscriptionRepo.exists(email);
    return !!doesExists;
  }

  async checkEmailDomain(email: string) {
    const domain = email.split("@")[1];
    if (!domain) return false;

    try {
      const mxRecords = await dns.resolveMx(domain);
      return mxRecords && mxRecords.length > 0;
    } catch (err) {
      return false;
    }
  }
}

const subscriptionService = new SubscriptionService();

export default subscriptionService;
