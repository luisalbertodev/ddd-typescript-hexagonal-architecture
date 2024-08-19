import { json, urlencoded } from "body-parser";
import compression from "compression";
import errorHandler from "errorhandler";
import express, { NextFunction, Request, Response } from "express";
import Router from "express-promise-router";
import helmet from "helmet";
import * as http from "http";
import httpStatus from "http-status";

import { registerRoutes } from "./routes";

export class Server {
  private readonly app: express.Express;
  private readonly port: string;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.app = express();

    // Middlewares
    this.setupMiddlewares();

    // Routes
    this.setupRoutes();

    // Error handling
    this.setupErrorHandling();
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.app.listen(this.port, () => {
        console.log(`Mock Backend App is running at http://localhost:${this.port} in ${this.app.get("env")} mode`);
        console.log("Press CTRL-C to stop\n");

        resolve();
      });
    });
  }

  getHTTPServer(): http.Server | undefined {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }

  private setupMiddlewares(): void {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));

    this.app.use(helmet.xssFilter());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.frameguard({ action: "deny" }));

    this.app.use(compression());
  }

  private setupRoutes(): void {
    const router = Router();
    this.app.use(router);

    registerRoutes(router);
  }

  private setupErrorHandling(): void {
    this.app.use(errorHandler());

    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
      next();
    });
  }
}
