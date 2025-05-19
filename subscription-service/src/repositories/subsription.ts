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

  existsByEmail(email: string) {
    return this.prisma.subscription.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
  }

  existsByToken(token: string) {
    return this.prisma.subscription.findFirst({
      where: {
        secretToken: token,
      },
      select: {
        id: true,
      },
    });
  }

  existsByCity(city: string) {
    return this.prisma.subscription.findFirst({
      where: {
        city,
      },
      select: {
        id: true,
      },
    });
  }

  update(
    id: number,
    data: Partial<Subscription>
  ): Promise<Subscription | null> {
    return this.prisma.subscription.update({ where: { id }, data });
  }

  delete(id: number): Promise<Subscription | null> {
    return this.prisma.subscription.delete({ where: { id } });
  }
}
