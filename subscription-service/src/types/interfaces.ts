export interface ClassCounstructor {
  new (...args: any[]): object;
}

declare module "express-serve-static-core" {
  interface Request {
    validatedQuery?: any;
  }
}
