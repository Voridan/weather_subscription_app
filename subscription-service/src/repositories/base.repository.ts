import { PrismaClient } from "../../prisma/generated/client";
import prisma from "../prisma.client";

export abstract class BaseRepository<T> {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  abstract getAll(): Promise<T[]>;
  abstract getById(id: number): Promise<T | null>;
  abstract create(data: any): Promise<T>;
  abstract update(id: number, data: any): Promise<T | null>;
  abstract delete(id: number): Promise<T | null>;
}
