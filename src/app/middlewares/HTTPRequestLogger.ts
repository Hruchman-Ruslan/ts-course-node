import { NextFunction, Request, Response } from "express";
import type { ExpressMiddlewareInterface } from "routing-controllers";
import { Middleware } from "routing-controllers";

// @Middleware({ type: "after" })
@Middleware({ type: "before" })
export class HTTPRequestLogger implements ExpressMiddlewareInterface {
  use(request: Request, response: Response, next: NextFunction) {
    const { originalUrl, method, body } = request;

    // const { statusCode } = response;

    console.log(
      `Received request: method${method} path${originalUrl}`,
      JSON.stringify(body)
    );

    next();
  }
}
