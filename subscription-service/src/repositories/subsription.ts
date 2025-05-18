import { BaseRepository } from "./base.repository";
import { Subscription } from "../../prisma/generated";
import { SubscriptionWithSecret } from "../types/subscription";

export class SubscriptionRepository extends BaseRepository<Subscription> {
  constructor() {
    super();
  }

  getAll(): Promise<Subscription[]> {
    throw new Error("Method not implemented.");
  }

  getById(id: number): Promise<Subscription | null> {
    throw new Error("Method not implemented.");
  }

  create(data: SubscriptionWithSecret): Promise<Subscription> {
    return this.prisma.subscription.create({ data });
  }

  exists(email: string) {
    return this.prisma.subscription.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
  }

  update(id: number, data: any): Promise<Subscription | null> {
    throw new Error("Method not implemented.");
  }

  delete(id: number): Promise<Subscription | null> {
    throw new Error("Method not implemented.");
  }
}
