import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { ClassCounstructor } from "../types";

export function validateQuery(dto: ClassCounstructor) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const instance = plainToInstance(dto, req.query);
    const errors = await validate(instance);

    if (errors.length > 0) {
      res.status(400).json({
        errors: errors.map((err) => ({
          property: err.property,
          constraints: err.constraints,
        })),
      });
      return;
    }

    req.validatedQuery = instance;
    next();
  };
}
