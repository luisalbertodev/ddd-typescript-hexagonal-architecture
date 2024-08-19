import { Request, Response } from "express";
import httpStatus from "http-status";
import { Service } from "typedi";

import { Controller } from "./Controller";

@Service()
export default class StatusGetController implements Controller {
  run(req: Request, res: Response): void {
    res.status(httpStatus.OK).send();
  }
}
